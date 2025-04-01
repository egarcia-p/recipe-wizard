import {
  fetchCategories,
  fetchCookbooks,
  fetchSubcategories,
  fetchUoms,
} from "@/app/lib/data";
import { Category, Cookbook, Subcategory, Uom } from "../../../types/types";
import { getSession } from "@auth0/nextjs-auth0/edge";
import Form from "@/app/ui/recipe/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Recipe",
};

export interface FormDataSuccess {
  cookbooks: Cookbook[];
  categories: Category[];
  subcategories: Subcategory[];
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

    const uoms: Uom[] = await fetchUoms(accessToken);

    if (!uoms || uoms.length === 0) {
      throw new Error("Failed to fetch uoms.");
    }

    return { cookbooks, categories, subcategories, uoms };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
};

export default async function Page() {
  const formDataResult = await getFormData();

  //TODO add better error handling
  if ("error" in formDataResult) {
    return <div>Error: {formDataResult.error}</div>;
  }

  const { cookbooks, categories, subcategories, ingredients, uoms } =
    formDataResult;

  return (
    <main>
      <h1 className="text-lg">Create Recipe</h1>
      <Form
        cookbooks={cookbooks}
        categories={categories}
        subcategories={subcategories}
        ingredients={ingredients}
        uoms={uoms}
      />
    </main>
  );
}
