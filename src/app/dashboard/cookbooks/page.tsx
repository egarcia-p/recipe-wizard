import { fetchCookbooks } from "@/app/lib/data";
import { Cookbook } from "@/app/types/types";
import { CookbookCard } from "@/app/ui/dashboard/cookbook-card";
import { CreateCard } from "@/app/ui/dashboard/create-card";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookbooks",
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

    if (cookbooks.error) {
      throw new Error(cookbooks.error_description);
    }

    return cookbooks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page() {
  const cookbooks: Cookbook[] = await getCookbooks();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center sm:text-left">Cookbooks</h1>

      <div className="flex flex-row flex-wrap gap-4 justify-start content-start w-full">
        <CreateCard name="Create Cookbook" url="/dashboard/cookbook/create" />
        <CookbookCard key={"All"} name="All" id={-1} />

        {cookbooks &&
          cookbooks.map((cookbook) => (
            <CookbookCard
              key={cookbook.id}
              name={cookbook.name}
              id={cookbook.id}
            />
          ))}
      </div>
    </main>
  );
}
