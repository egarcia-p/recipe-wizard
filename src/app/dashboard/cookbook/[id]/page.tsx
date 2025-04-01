import { Metadata } from "next";
import { fetchRecipesByUSer, fetchRecipesForCookbook } from "../../../lib/data";
import { Recipe } from "../../../types/types";
import { Card } from "@/app/ui/dashboard/card";
import { PagePropsDashboard } from "@/app/types/types";
import { getSession } from "@auth0/nextjs-auth0/edge";

export const metadata: Metadata = {
  title: "Recipes",
};

const getRecipes = async ({
  cookbook_id,
}: {
  cookbook_id: string;
}): Promise<Recipe[]> => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("Failed to get access token.");
    }

    // TODO send id of cookbook to fetch recipes for that cookbook
    let recipes: Recipe[] = [];
    if (cookbook_id === "-1") {
      recipes = await fetchRecipesByUSer(accessToken);
    } else {
      recipes = await fetchRecipesForCookbook(accessToken, cookbook_id);
    }

    if (!recipes || recipes.length === 0) {
      throw new Error("Failed to fetch recipes.");
    }

    return recipes;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page({
  params,
  searchParams,
}: PagePropsDashboard) {
  const cookbook_id = await params.then((params) => params.id);
  const name = await searchParams.then((searchParams) => searchParams.name);

  const recipes: Recipe[] = await getRecipes({ cookbook_id });

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center sm:text-left">
        Cookbook: {name}
      </h1>

      <div className="flex flex-row gap-4 flex-wrap w-full">
        {recipes.map((recipe) => (
          <Card key={recipe.id} title={recipe.title} id={recipe.id} />
        ))}
      </div>
    </main>
  );
}
