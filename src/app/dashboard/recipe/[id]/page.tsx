import { Metadata } from "next";
import { fetchReciepeById } from "../../../lib/data";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { RecipeComponent } from "@/app/ui/recipe/recipe";
import { Recipe } from "@/app/types/types";

export const metadata: Metadata = {
  title: "Recipes",
};

export const getRecipe = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    console.log("accessToken", accessToken);

    const recipe = await fetchReciepeById(accessToken, "1"); // TODO Check ids?

    if (!recipe || recipe.length === 0) {
      throw new Error("Failed to fetch recipe by id.");
    }

    return recipe;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page() {
  const recipe: Recipe = await getRecipe();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <RecipeComponent recipe={recipe} />
    </main>
  );
}
