import type { Section } from "@/app/types/types";

export function SectionIngredients({ section }: { section: Section }) {
  return (
    <div className="rounded-md p-4 bg-background-1 ">
      <h3 className="font-bold text-xl">{section.name}</h3>
      {section.recipe_ingredients.map((recipe_ingredient) => (
        <div key={recipe_ingredient.id}>
          <div className="flex justify-items-start gap-2 font-thin">
            <div className="">{recipe_ingredient.quantity}</div>

            <div>{recipe_ingredient.name}</div>
            <div>{recipe_ingredient.uom_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
