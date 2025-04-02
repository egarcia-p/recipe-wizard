"use client";

import { updateRecipe } from "@/app/lib/action";
import {
  Category,
  Cookbook,
  Recipe,
  Subcategory,
  Uom,
  RecipeForm,
  Section,
  Step,
  RecipeIngredient,
} from "@/app/types/types";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { Button } from "../button";
import { CreateSectionComponent } from "./create-section";
import { ErrorMessage } from "../error-message";

const transformRecipeToForm = (recipe: Recipe): RecipeForm => {
  return {
    ...recipe,
    sections: recipe.sections.map((section: Section) => ({
      id: section.id.toString(),
      name: section.name,
      sort_number: section.sort_number,
      steps_attributes: section.steps.map((step: Step) => ({
        id: step.id.toString(),
        description: step.description,
        step_number: step.step_number,
      })),
      recipe_ingredients_attributes: section.recipe_ingredients.map(
        (ingredient: RecipeIngredient) => ({
          id: ingredient.id.toString(),
          ingredient_id: ingredient.ingredient_id,
          uom_id: ingredient.uom_id,
          quantity: ingredient.quantity,
          fdc_id: ingredient.fdc_id,
          name: ingredient.name,
        })
      ),
    })),
  };
};

type StepField = keyof Pick<Step, "description" | "step_number">;
type IngredientField = keyof Pick<
  RecipeIngredient,
  "ingredient_id" | "quantity" | "uom_id" | "fdc_id" | "name"
>;

export default function Form({
  recipe,
  cookbooks,
  categories,
  subcategories,
  uoms,
}: {
  recipe: Recipe;
  cookbooks: Cookbook[];
  categories: Category[];
  subcategories: Subcategory[];
  uoms: Uom[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(updateRecipe, initialState);

  const recipeForm: RecipeForm = transformRecipeToForm(recipe);
  const [sections, setSections] = useState(recipeForm.sections);

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string | number
  ): void => {
    const newSections = [...sections];
    if (typeof value === "string" || typeof value === "number") {
      newSections[index] = {
        ...newSections[index],
        [field]: value,
      };
      setSections(newSections);
    }
  };

  const handleStepChange = (
    sectionIndex: number,
    stepIndex: number,
    field: StepField,
    value: string | number
  ): void => {
    const newSections = [...sections];
    newSections[sectionIndex].steps_attributes[stepIndex] = {
      ...newSections[sectionIndex].steps_attributes[stepIndex],
      [field]: value,
    };
    setSections(newSections);
  };

  const handleIngredientChange = (
    sectionIndex: number,
    ingredientIndex: number,
    field: IngredientField,
    value: string | number | null
  ): void => {
    const newSections = [...sections];
    newSections[sectionIndex].recipe_ingredients_attributes[ingredientIndex] = {
      ...newSections[sectionIndex].recipe_ingredients_attributes[
        ingredientIndex
      ],
      [field]: value,
    };
    setSections(newSections);
  };

  const handleNewSection = () => {
    setSections([
      ...sections,
      {
        name: "",
        sort_number: sections.length + 1,
        steps_attributes: [{ description: "", step_number: 1 }],
        recipe_ingredients_attributes: [
          { ingredient_id: 0, quantity: 1, uom_id: 0, fdc_id: 0, name: "" },
        ],
      },
    ]);
  };

  const handleNewStep = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].steps_attributes.push({
      description: "",
      step_number: newSections[sectionIndex].steps_attributes.length + 1,
    });
    setSections(newSections);
  };

  const handleNewRecipeIngredient = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].recipe_ingredients_attributes.push({
      ingredient_id: 0,
      quantity: 1,
      uom_id: 0,
      fdc_id: 0,
      name: "",
    });
    setSections(newSections);
  };

  interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    subtitle: HTMLInputElement;
    author: HTMLInputElement;
    servings: HTMLInputElement;
    total_time: HTMLInputElement;
    category_id: HTMLSelectElement;
    subcategory_id: HTMLSelectElement;
    cookbook_id: HTMLSelectElement;
  }

  interface RecipeFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleSubmit = async (
    event: React.FormEvent<RecipeFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData();
    formData.append("title", form.elements.title.value);
    formData.append("subtitle", form.elements.subtitle.value);
    formData.append("author", form.elements.author.value);
    formData.append("servings", form.elements.servings.value);
    formData.append("total_time", form.elements.total_time.value);
    formData.append("category_id", form.elements.category_id.value);
    formData.append("subcategory_id", form.elements.subcategory_id.value);
    formData.append("cookbook_id", form.elements.cookbook_id.value);
    formData.append("sections", JSON.stringify(sections));
    // Send formData to the server
    startTransition(async () => {
      await dispatch(formData);
    });
  };

  return (
    <>
      {state.message && <ErrorMessage> {state.message}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <input
          id="recipe_id"
          name="recipe_id"
          type="hidden"
          value={recipe.id}
        />
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/2 mx-auto p-4">
            <div className="flex flex-row w-full justify-between gap-4">
              {/* Title */}
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Choose title
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative h-10">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter a title"
                      defaultValue={recipe.title}
                      className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="title-error"
                    />
                    {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                  </div>
                  <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title &&
                      state.errors.title.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="subtitle"
                  className="mb-2 block text-sm font-medium"
                >
                  Choose subtitle
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative h-10">
                    <input
                      id="subtitle"
                      name="subtitle"
                      type="text"
                      defaultValue={recipe.subtitle || ""}
                      placeholder="Enter a subtitle"
                      className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="subtitle-error"
                    />
                    {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                  </div>
                  <div
                    id="subtitle-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.subtitle &&
                      state.errors.subtitle.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row w-full justify-between gap-4">
              {/* Servings  */}
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="servings"
                  className="mb-2 block text-sm font-medium"
                >
                  Servings
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative h-10">
                    <input
                      id="servings"
                      name="servings"
                      type="number"
                      step="1.0"
                      defaultValue={recipe.servings}
                      placeholder="Enter servings"
                      className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="servings-error"
                    />
                    {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                  </div>
                  <div
                    id="servings-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.servings &&
                      state.errors.servings.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>

              {/* Total Time */}
              <div className="mb-4 w-1/2">
                <label
                  htmlFor="total_time"
                  className="mb-2 block text-sm font-medium"
                >
                  Total Time
                </label>
                <div className="relative mt-2 rounded-md">
                  <div className="relative h-10">
                    <input
                      id="total_time"
                      name="total_time"
                      type="number"
                      step="1.0"
                      defaultValue={recipe.total_time}
                      placeholder="Enter time in minutes"
                      className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby="total_time-error"
                    />
                    {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                  </div>
                  <div
                    id="total_time-error"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {state.errors?.total_time &&
                      state.errors.total_time.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="mb-4">
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium"
              >
                Choose Author
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    defaultValue={recipe.author}
                    placeholder="Enter author's name"
                    className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="author-error"
                  />
                  {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
                <div id="author-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.author &&
                    state.errors.author.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 mx-auto p-4">
            {/* Category Name */}
            <div className="mb-4">
              <label
                htmlFor="category_id"
                className="mb-2 block text-sm font-medium"
              >
                Choose category
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <select
                    id="category_id"
                    name="category_id"
                    className="peer block w-full h-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={recipe.category_id}
                    aria-describedby="category_id-error"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {Object.entries(categories).map(
                      ([, category]: [string, Category]) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                  {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
                <div
                  id="category_id-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.category_id &&
                    state.errors.category_id.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* SubCategory  */}
            <div className="mb-4">
              <label
                htmlFor="subcategory_id"
                className="mb-2 block text-sm font-medium"
              >
                Choose Subcategory
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <select
                    id="subcategory_id"
                    name="subcategory_id"
                    className="peer block w-full h-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={recipe.subcategory_id}
                    aria-describedby="subcategory_id-error"
                  >
                    <option value="" disabled>
                      Select a subcategory
                    </option>
                    {Object.entries(subcategories).map(
                      ([, subcategory]: [string, Subcategory]) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      )
                    )}
                  </select>
                  {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
                <div
                  id="subcategory_id-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.subcategory_id &&
                    state.errors.subcategory_id.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {/* Cookbook */}
            <div className="mb-4">
              <label
                htmlFor="cookbook_id"
                className="mb-2 block text-sm font-medium"
              >
                Choose cookbook
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <select
                    id="cookbook_id"
                    name="cookbook_id"
                    className="peer block w-full h-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue={recipe.cookbook_id}
                    aria-describedby="cookbook_id-error"
                  >
                    <option value="" disabled>
                      Select a cookbook
                    </option>
                    {Object.entries(cookbooks).map(
                      ([, cookbook]: [string, Cookbook]) => (
                        <option key={cookbook.id} value={cookbook.id}>
                          {cookbook.name}
                        </option>
                      )
                    )}
                  </select>
                  {/* <  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
                <div
                  id="cookbook_id-error"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {state.errors?.cookbook_id &&
                    state.errors.cookbook_id.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button type="button" onClick={handleNewSection}>
          Add New Section
        </Button>
        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <CreateSectionComponent
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            uoms={uoms}
            handleSectionChange={handleSectionChange}
            handleStepChange={handleStepChange}
            handleIngredientChange={handleIngredientChange}
            handleNewStep={handleNewStep}
            handleNewRecipeIngredient={handleNewRecipeIngredient}
          />
        ))}

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/transactions"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit Recipe</Button>
        </div>
      </form>
    </>
  );
}
