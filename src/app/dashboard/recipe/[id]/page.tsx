import { Metadata } from "next";
import { fetchReciepeById, fetchUser } from "../../../lib/data";
import { getSession } from "@auth0/nextjs-auth0/edge";
import { RecipeComponent } from "@/app/ui/recipe/recipe";
import { Recipe, User } from "@/app/types/types";
import { PagePropsDashboard } from "@/app/types/types";

export const metadata: Metadata = {
  title: "Recipes",
};

const getRecipe = async ({ id }: { id: string }) => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

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

const getUser = async () => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

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

export default async function Page({ params }: PagePropsDashboard) {
  const recipe: Recipe = await getRecipe({
    id: await params.then((params) => params.id),
  });
  const user: User = await getUser();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <RecipeComponent recipe={recipe} user={user} />
    </main>
  );
}
