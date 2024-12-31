import { Metadata } from "next";
import { fetchAllRecipes } from "../lib/data";
import { Recipe } from "../types/types";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const metadata: Metadata = {
  title: "Recipes",
};

export const getRecipes = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

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

export default async function Recipes() {
  const recipes: Recipe[] = await getRecipes();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Recipes</h1>

        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
