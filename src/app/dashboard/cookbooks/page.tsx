import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookbooks",
};

export default async function Cookbook() {
  const cookbooks = [
    { id: 1000, title: "All Recipes" },
    { id: 2, title: "Cookbook 2" },
  ];

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center sm:text-left">Cookbooks</h1>

      <ul>
        {cookbooks.map((cookbook) => (
          <li key={cookbook.id}>{cookbook.title}</li>
        ))}
      </ul>
    </main>
  );
}
