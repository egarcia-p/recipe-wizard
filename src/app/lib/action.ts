"use server";

import z from "zod";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SERVER_URL = process.env.API_SERVER_URL;

const SectionSchema = z.object({
  name: z.string().nonempty(),
  //recipe_id: z.number().nullable(),
  sort_number: z.coerce
    .number()
    .gt(0, { message: "Sort Number must be greater than 0" }),
  steps_attributes: z.array(
    z.object({
      description: z.string().nonempty(),
      step_number: z.coerce
        .number()
        .gt(0, { message: "Step must be greater than 0" }),
      //section_id: z.number().nullable(),
    })
  ),
  recipe_ingredients_attributes: z.array(
    z.object({
      quantity: z.coerce
        .number()
        .gt(0, { message: "Quantity must be greater than 0" }),
      uom_id: z.coerce
        .number()
        .gt(0, { message: "UOM must be greater than 0" }),
      fdc_id: z.coerce
        .number()
        .gt(0, { message: "FDC_ID must be greater than 0" }),
      name: z.string(),
    })
  ),
});

const SectionSchemaUpdate = z.object({
  id: z.coerce.number(),
  name: z.string().nonempty(),
  //recipe_id: z.number().nullable(),
  sort_number: z.coerce
    .number()
    .gt(0, { message: "Sort Number must be greater than 0" }),
  steps_attributes: z.array(
    z.object({
      id: z.coerce.number(),
      description: z.string().nonempty(),
      step_number: z.coerce
        .number()
        .gt(0, { message: "Step must be greater than 0" }),
    })
  ),
  recipe_ingredients_attributes: z.array(
    z.object({
      id: z.coerce.number().optional(),
      quantity: z.coerce.number(),
      uom_id: z.coerce.number(),
      fdc_id: z.coerce
        .number()
        .gt(0, { message: "FDC_ID must be greater than 0" }),
      name: z.string(),
    })
  ),
});

const RecipeFormSchema = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  subtitle: z.string().nullable(),
  author: z.string().nonempty(),
  servings: z.coerce
    .number()
    .gt(0, { message: "Servings must be greater than 0" }),
  total_time: z.coerce
    .number()
    .gt(0, { message: "Total time must be greater than 0" }),
  category_id: z.coerce.number(),
  subcategory_id: z.coerce.number(),
  cookbook_id: z.coerce.number().nullable(),
  sections: z.array(SectionSchema),
});

const RecipeFormSchemaUpdate = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  subtitle: z.string().nullable(),
  author: z.string().nonempty(),
  servings: z.coerce
    .number()
    .gt(0, { message: "Servings must be greater than 0" }),
  total_time: z.coerce
    .number()
    .gt(0, { message: "Total time must be greater than 0" }),
  category_id: z.coerce.number(),
  subcategory_id: z.coerce.number(),
  cookbook_id: z.coerce.number().nullable(),
  sections: z.array(SectionSchemaUpdate),
});

const CreateRecipe = RecipeFormSchema.omit({ id: true });

const SectionsFormSchema = z.array(SectionSchema);

const UpdateRecipe = RecipeFormSchemaUpdate;

const UpdateSectionsFormSchema = z.array(SectionSchemaUpdate);

export type RecipeState = {
  errors?: {
    title?: string[];
    subtitle?: string[];
    author?: string[];
    servings?: string[];
    total_time?: string[];
    category_id?: string[];
    subcategory_id?: string[];
    cookbook_id?: string[];
    sections?: {
      name?: string[];
      steps_attributes?: {
        description?: string[];
        step_number?: string[];
      }[];
      recipe_ingredients_attributes?: {
        name?: string[];
        uom_name?: string[];
        short_name?: string[];
        quantity?: string[];
      }[];
    }[];
  };
  message?: string | null;
};

const CookbookFormSchema = z.object({
  id: z.string(),
  name: z.string().nonempty(),
});

const CreateCookbook = CookbookFormSchema.omit({ id: true });

export type CookbookState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createRecipe(prevState: RecipeState, formData: FormData) {
  let recipeId = 0;
  const sectionsForm = JSON.parse(formData.get("sections") as string);

  const validatedSections = SectionsFormSchema.safeParse(sectionsForm);

  if (!validatedSections.success) {
    return {
      errors: {
        sections: validatedSections.error.flatten().fieldErrors,
      },
      message: "Missing Section Fields. Failed to Edit Recipe.",
    };
  }
  const validatedFields = CreateRecipe.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    author: formData.get("author"),
    servings: formData.get("servings"),
    total_time: formData.get("total_time"),
    category_id: formData.get("category_id"),
    subcategory_id: formData.get("subcategory_id"),
    sections: sectionsForm,
    cookbook_id: formData.get("cookbook_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Recipe.",
    };
  }

  const {
    title,
    subtitle,
    author,
    servings,
    total_time,
    category_id,
    subcategory_id,
    sections,
    cookbook_id,
  } = validatedFields.data;

  try {
    const recipe = {
      title: title,
      subtitle: subtitle,
      author: author,
      servings: servings,
      total_time: total_time,
      category_id: category_id,
      subcategory_id: subcategory_id,
      sections_attributes: sections,
      cookbook_id: cookbook_id,
    };

    const session = await getSession();
    const accessToken = session?.accessToken;

    // Call API to create recipe
    const response = await fetch(SERVER_URL + "/api/v1/recipes/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    const result = await response.json();

    switch (response.status) {
      case 200:
        recipeId = result.id;
        break;
      case 422:
        return {
          errors: result.errors || [],
          message: "Server validation failed.",
        };
      case 500:
        return {
          errors: [],
          message: "Internal server error.",
        };
      default:
        return {
          errors: [],
          message: `An unexpected error occurred. Status code: ${response.status}`,
        };
    }
  } catch (error) {
    console.error("Error creating recipe:", error);
    return {
      errors: prevState.errors,
      message: "Failed to create recipe.",
    };
  }

  revalidatePath("/dashboard/recipe/" + recipeId);
  redirect("/dashboard/recipe/" + recipeId);
}

export async function updateRecipe(prevState: RecipeState, formData: FormData) {
  const recipeId = formData.get("recipe_id");

  const sectionsForm = JSON.parse(formData.get("sections") as string);

  const validatedSections = UpdateSectionsFormSchema.safeParse(sectionsForm);

  if (!validatedSections.success) {
    return {
      errors: {
        sections: validatedSections.error.flatten().fieldErrors,
      },
      message: "Missing Section Fields. Failed to Edit Recipe.",
    };
  }

  const validatedFields = UpdateRecipe.safeParse({
    id: formData.get("recipe_id"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    author: formData.get("author"),
    servings: formData.get("servings"),
    total_time: formData.get("total_time"),
    category_id: formData.get("category_id"),
    subcategory_id: formData.get("subcategory_id"),
    sections: sectionsForm,
    cookbook_id: formData.get("cookbook_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Recipe.",
    };
  }

  const {
    id,
    title,
    subtitle,
    author,
    servings,
    total_time,
    category_id,
    subcategory_id,
    sections,
    cookbook_id,
  } = validatedFields.data;

  try {
    const recipe = {
      id: id,
      title: title,
      subtitle: subtitle,
      author: author,
      servings: servings,
      total_time: total_time,
      category_id: category_id,
      subcategory_id: subcategory_id,
      sections_attributes: sections,
      cookbook_id: cookbook_id,
    };

    const session = await getSession();
    const accessToken = session?.accessToken;

    // Call API to edit recipe
    const response = await fetch(
      SERVER_URL + "/api/v1/recipes/edit/" + recipe.id,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }
    );

    const result = await response.json();

    switch (response.status) {
      case 200:
        break;
      case 403:
        return {
          errors: [],
          message: "Unauthorized to edit recipe.",
        };
      case 422:
        return {
          errors: result.errors || [],
          message: "Server validation failed.",
        };
      case 500:
        return {
          errors: [],
          message: "Internal server error.",
        };
      default:
        return {
          errors: [],
          message: `An unexpected error occurred. Status code: ${response.status}`,
        };
    }
  } catch (error) {
    console.error("Error editing recipe:", error);
    return {
      errors: prevState.errors,
      message: "Failed to edit recipe.",
    };
  }

  revalidatePath("/dashboard/recipe/" + recipeId);
  redirect("/dashboard/recipe/" + recipeId);
}

export async function deleteRecipe(id: number) {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    // Call API to edit recipe
    const response = await fetch(SERVER_URL + "/api/v1/recipes/destroy/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    switch (response.status) {
      case 200:
        break;
      case 403:
        return {
          errors: [],
          message: "Unauthorized to delete recipe.",
        };
      case 422:
        return {
          errors: result.errors || [],
          message: "Server validation failed.",
        };
      case 500:
        return {
          errors: [],
          message: "Internal server error.",
        };
      default:
        return {
          errors: [],
          message: `An unexpected error occurred. Status code: ${response.status}`,
        };
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return {
      message: "Failed to delete recipe.",
    };
  }

  revalidatePath("/dashboard/cookbooks");
  redirect("/dashboard/cookbooks");
}

export async function createCookbook(
  prevState: CookbookState,
  formData: FormData
) {
  const validatedFields = CreateCookbook.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Cookbook.",
    };
  }

  const { name } = validatedFields.data;

  try {
    const object = {
      name: name,
    };

    const session = await getSession();
    const accessToken = session?.accessToken;

    // Call API to create cookbook
    const response = await fetch(SERVER_URL + "/api/v1/cookbooks/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    const result = await response.json();
    // check if result is an error
    if (result.errors) {
      return {
        errors: result.errors,
        message: "Failed to create cookbook",
      };
    }
  } catch (error) {
    console.error("Error creating cookbook:", error);
    return {
      errors: prevState.errors,
      message: "Failed to create cookbook.",
    };
  }
  revalidatePath("/dashboard/cookbooks");
  redirect("/dashboard/cookbooks");
}
