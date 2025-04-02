import { Metadata } from "next";
import { fetchReciepeById } from "@/app/lib/data";
import { getSession } from "@auth0/nextjs-auth0/edge";
import {
  fetchCategories,
  fetchCookbooks,
  fetchIngredients,
  fetchSubcategories,
  fetchUoms,
} from "@/app/lib/data";
import {
  Recipe,
  Category,
  Cookbook,
  Ingredient,
  Subcategory,
  Uom,
} from "@/app/types/types";
import Form from "@/app/ui/recipe/edit-form";
import { ErrorMessage } from "@/app/ui/error-message";
import { PagePropsDashboard } from "@/app/types/types";

export const metadata: Metadata = {
  title: "Edit Recipe",
};

export interface FormDataSuccess {
  cookbooks: Cookbook[];
  categories: Category[];
  subcategories: Subcategory[];
  ingredients: Ingredient[];
  uoms: Uom[];
}

export interface FormDataError {
  error: string;
}

export type FormDataResult = FormDataSuccess | FormDataError;

const getFormData = async (): Promise<FormDataResult> => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    const cookbooks: Cookbook[] = await fetchCookbooks(accessToken);

    if (!cookbooks || cookbooks.length === 0) {
      throw new Error("Failed to fetch cookbooks.");
    }

    const categories: Category[] = await fetchCategories(accessToken);

    if (!categories || categories.length === 0) {
      throw new Error("Failed to fetch categories.");
    }

    const subcategories: Subcategory[] = await fetchSubcategories(accessToken);

    if (!subcategories || subcategories.length === 0) {
      throw new Error("Failed to fetch subcategories.");
    }

    const ingredients: Ingredient[] = await fetchIngredients(accessToken);

    if (!ingredients || ingredients.length === 0) {
      throw new Error("Failed to fetch ingredients.");
    }

    const uoms: Uom[] = await fetchUoms(accessToken);

    if (!uoms || uoms.length === 0) {
      throw new Error("Failed to fetch uoms.");
    }

    return { cookbooks, categories, subcategories, ingredients, uoms };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
};

const getRecipe = async ({ id }: { id: string }) => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    console.log("accessToken", accessToken);

    const recipe = await fetchReciepeById(accessToken, id);

    if (!recipe || recipe.length === 0) {
      throw new Error("Failed to fetch recipe by id.");
    }

    return recipe;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page({ params }: PagePropsDashboard) {
  const recipe: Recipe = await getRecipe({
    id: await params.then((params) => params.id),
  });

  const formDataResult = await getFormData();

  if ("error" in formDataResult) {
    return <ErrorMessage>Error: {formDataResult.error}</ErrorMessage>;
  }

  const { cookbooks, categories, subcategories, uoms } = formDataResult;

  return (
    <Form
      recipe={recipe}
      cookbooks={cookbooks}
      categories={categories}
      subcategories={subcategories}
      uoms={uoms}
    />
  );
}
