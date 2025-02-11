"use server";

import z from "zod";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { title } from "process";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Cookbook } from "../types/types";

const SERVER_URL = process.env.API_SERVER_URL;

const SectionSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  recipe_id: z.number(),
  sort_number: z.number(),
  steps: z.array(
    z.object({
      id: z.number(),
      description: z.string().nonempty(),
      step_number: z.number(),
      recipe_id: z.number(),
      section_id: z.number(),
    })
  ),
  recipe_ingredients: z.array(
    z.object({
      id: z.number(),
      recipe_id: z.number(),
      ingredient_id: z.number(),
      quantity: z.number(),
      uom_id: z.number(),
      section_id: z.number(),
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

const CreateRecipe = RecipeFormSchema.omit({ id: true });

//const UpdateRecipe = RecipeFormSchema.omit({ id: true });

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
      steps?: {
        description?: string[];
        step_number?: string[];
      }[];
      recipe_ingredients?: {
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
  const validatedFields = CreateRecipe.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    author: formData.get("author"),
    servings: formData.get("servings"),
    total_time: formData.get("total_time"),
    category_id: formData.get("category_id"),
    subcategory_id: formData.get("subcategory_id"),
    sections: formData.getAll("sections"),
    cookbook_id: formData.get("cookbook_id"),
  });

  console.log(formData);

  console.log(formData.get("servings"));

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
      sections: sections,
      cookbook_id: cookbook_id,
    };

    console.log(recipe);

    const { accessToken } = await getAccessToken();

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
    return result;
  } catch (error) {
    console.error("Error creating recipe:", error);
    return {
      errors: prevState.errors,
      message: "Failed to create recipe.",
    };
  }
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

    console.log(object);
    console.log(JSON.stringify(object));

    const { accessToken } = await getAccessToken();

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
