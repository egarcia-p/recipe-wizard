import type { Recipe } from "@/app/types/types";
import { SectionSteps } from "./section-steps";
import { SectionIngredients } from "./section-ingredients";

export function RecipeComponent({ recipe }: { recipe: Recipe }) {
  return (
    <div className="w-full  p-2 shadow-sm">
      <div className="flex">
        <h1 className="m-2 text-xl md:text-4xl font-medium">{recipe.title}</h1>
        <h1 className="m-2 text-lg md:text-2xl font-medium">
          {recipe.subtitle}
        </h1>
      </div>
      <div className="flex flex-row w-full justify-left">
        <div>
          <span className="m-2 text-sm md:text-lg font-light">
            {recipe.author}
          </span>
        </div>
        <div>
          <span className="m-2 text-sm md:text-lg font-light">
            Servings:{recipe.servings}
          </span>
        </div>
        <div>
          <span className="m-2 text-sm md:text-lg font-light">
            Servings:{recipe.total_time}
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          className="rounded-xl"
          src="https://placehold.co/600x400"
          alt="Placeholder"
        />
      </div>
      <div className="flex h-screen flex-col p-6 md:p-12 md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          {recipe.sections &&
            recipe.sections.map((section) => (
              <SectionIngredients key={section.id} section={section} />
            ))}
        </div>
        <div className="flex-grow md:overflow-y-auto ">
          <div>
            {recipe.sections &&
              recipe.sections.map((section) => (
                <SectionSteps key={section.id} section={section} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
