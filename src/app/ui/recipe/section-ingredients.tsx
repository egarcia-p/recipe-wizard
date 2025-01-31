import type { Section } from "@/app/types/types";

export function SectionIngredients({ section }: { section: Section }) {
  return (
    <div>
      <h3 className=" text-xl">{section.name}</h3>
      {section.recipe_ingredients.map((recipe_ingredient) => (
        <div key={recipe_ingredient.id}>
          <p>
            {recipe_ingredient.quantity}
            <span>{recipe_ingredient.name}</span>
            <span>{recipe_ingredient.uom_name}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
