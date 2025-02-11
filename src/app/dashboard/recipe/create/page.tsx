import { fetchCookbooks } from "@/app/lib/data";
import { Cookbook } from "../../../types/types";
import { getAccessToken } from "@auth0/nextjs-auth0";
import Form from "@/app/ui/recipe/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Recipe",
};

export const getCookbooks = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    const cookbooks = await fetchCookbooks(accessToken);

    if (!cookbooks || cookbooks.length === 0) {
      throw new Error("Failed to fetch cookbooks.");
    }

    return cookbooks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //const cookbooks: Cookbook[] = await getCookbooks();
  console.log(searchParams);

  const cookbooks = { "1": "Cookbook 1", "2": "Cookbook 2" };
  const categories = { "1": "Category 1", "2": "Category 2" };

  return (
    <main>
      <h1 className="text-lg">Create Recipe</h1>
      <Form cookbooks={cookbooks} categories={categories} />
    </main>
  );
}
