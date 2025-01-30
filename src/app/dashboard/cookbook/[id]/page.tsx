import { Metadata } from "next";
import { fetchAllRecipes } from "../../../lib/data";
import { Recipe } from "../../../types/types";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { title } from "process";
import { Card } from "@/app/ui/dashboard/card";

export const metadata: Metadata = {
  title: "Recipes",
};

export const getRecipes = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    // TODO send id of cookbook to fetch recipes for that cookbook
    const recipes = await fetchAllRecipes(accessToken);

    if (!recipes || recipes.length === 0) {
      throw new Error("Failed to fetch recipes.");
    }

    return recipes;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Cookbook({ title = "All" }: { title: string }) {
  const recipes: Recipe[] = await getRecipes();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center sm:text-left">
        Cookbok: {title}
      </h1>

      <div className="flex flex-row gap-4 flex-wrap">
        {recipes.map((recipe) => (
          <Card key={recipe.id} title={recipe.title} />
        ))}
      </div>
    </main>
  );
}
