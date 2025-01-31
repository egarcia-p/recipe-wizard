import type { Recipe } from "@/app/types/types";

export function RecipeComponent({ recipe }: { recipe: Recipe }) {
  const steps =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequuntur quisquam, quam corporis cupiditate aliquid esse id! Quas dicta ad nobis consequatur ipsum cupiditate alias! Consectetur rem quam iure nam.";

  return (
    <div className="w-full  p-2 shadow-sm">
      <div className="flex justify-center">
        <img
          className="rounded-xl"
          src="https://placehold.co/600x400"
          alt="Placeholder"
        />
      </div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">Ingredients:</div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">{recipe.title}</h3>
          </div>
          <div>
            <p className="ml-2 text-sm">{steps}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
