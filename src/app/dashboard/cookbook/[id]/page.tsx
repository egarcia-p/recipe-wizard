import { Metadata } from "next";
import { fetchRecipesByUSer, fetchRecipesForCookbook } from "../../../lib/data";
import { Recipe } from "../../../types/types";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { Card } from "@/app/ui/dashboard/card";
import { SearchParams } from "next/dist/server/request/search-params";

export const metadata: Metadata = {
  title: "Recipes",
};

const getRecipes = async ({ cookbook_id }: { cookbook_id: string }) => {
  try {
    const { accessToken } = await getAccessToken();

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
}: {
  params: { id: string };
  searchParams: SearchParams;
}) {
  const cookbook_id = (await params).id;
  const recipes: Recipe[] = await getRecipes({ cookbook_id });

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center sm:text-left">
        Cookbook: {searchParams.name}
      </h1>

      <div className="flex flex-row gap-4 flex-wrap w-full">
        {recipes.map((recipe) => (
          <Card key={recipe.id} title={recipe.title} id={recipe.id} />
        ))}
      </div>
    </main>
  );
}
