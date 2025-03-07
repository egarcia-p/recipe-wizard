import { Metadata } from "next";
import { fetchReciepeById, fetchUser } from "../../../lib/data";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { RecipeComponent } from "@/app/ui/recipe/recipe";
import { Recipe, User } from "@/app/types/types";

export const metadata: Metadata = {
  title: "Recipes",
};

export const getRecipe = async ({ id }: { id: string }) => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

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

export const getUser = async () => {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }
    const user = await fetchUser(accessToken);

    if (!user || user.length === 0) {
      throw new Error("Failed to fetch user from server");
    }

    return user;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const recipe: Recipe = await getRecipe({ id: params.id });
  const user: User = await getUser();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <RecipeComponent recipe={recipe} user={user} />
    </main>
  );
}
