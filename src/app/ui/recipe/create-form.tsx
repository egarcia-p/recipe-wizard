"use client";

import { createRecipe } from "@/app/lib/action";
import {
  Category,
  Cookbook,
  Ingredient,
  Subcategory,
  Uom,
} from "@/app/types/types";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { Button } from "../button";
import { CreateSectionComponent } from "./create-section";
import { ErrorMessage } from "../error-message";

export default function Form({
  cookbooks,
  categories,
  subcategories,
  ingredients,
  uoms,
}: {
  cookbooks: Cookbook[];
  categories: Category[];
  subcategories: Subcategory[];
  ingredients: Ingredient[];
  uoms: Uom[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(createRecipe, initialState);

  const [sections, setSections] = useState([
    {
      name: "",
      sort_number: 1,
      steps_attributes: [{ description: "", step_number: 1 }],
      recipe_ingredients_attributes: [
        { ingredient_id: 0, quantity: 1, uom_id: 0, fdc_id: 0, name: "" },
      ],
    },
  ]);

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleStepChange = (sectionIndex, stepIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].steps_attributes[stepIndex][field] = value;
    setSections(newSections);
  };

  const handleIngredientChange = (
    sectionIndex,
    ingredientIndex,
    field,
    value
  ) => {
    const newSections = [...sections];
    newSections[sectionIndex].recipe_ingredients_attributes[ingredientIndex][
      field
    ] = value;
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

  const handleNewStep = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].steps_attributes.push({
      description: "",
      step_number: newSections[sectionIndex].steps_attributes.length + 1,
    });
    setSections(newSections);
  };

  const handleNewRecipeIngredient = (sectionIndex) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("subtitle", event.target.subtitle.value);
    formData.append("author", event.target.author.value);
    formData.append("servings", event.target.servings.value);
    formData.append("total_time", event.target.total_time.value);
    formData.append("category_id", event.target.category_id.value);
    formData.append("subcategory_id", event.target.subcategory_id.value);
    formData.append("cookbook_id", event.target.cookbook_id.value);
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
                    defaultValue=""
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
                    defaultValue=""
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
                    key="cookbook_id"
                    id="cookbook_id"
                    name="cookbook_id"
                    className="peer block w-full h-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    defaultValue=""
                    aria-describedby="cookbook_id-error"
                  >
                    <option key={0} value="" disabled>
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
            ingredients={ingredients}
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
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </>
  );
}
