"use client";

import { Ingredient, SectionForm, Uom } from "@/app/types/types";
import { Button } from "../button";
import SearchableDropdown from "../searchable-dropdown";
import { useState } from "react";
type CallbackSectionFunction = (
  index: number,
  field: string,
  value: string
) => void;
type CallbackStepFunction = (
  sectionIndex: number,
  index: number,
  field: string,
  value: string
) => void;
type CallbackIngredientFunction = (
  sectionIndex: number,
  index: number,
  field: string,
  value: string
) => void;
type CallbackNewStep = (sectionIndex: number) => void;
type CallbackNewRecipeIngredient = (sectionIndex: number) => void;

export function CreateSectionComponent({
  section,
  sectionIndex,
  ingredients,
  uoms,
  handleSectionChange,
  handleStepChange,
  handleIngredientChange,
  handleNewStep,
  handleNewRecipeIngredient,
}: {
  section: SectionForm;
  sectionIndex: number;
  ingredients: Ingredient[];
  uoms: Uom[];
  handleSectionChange: CallbackSectionFunction;
  handleStepChange: CallbackStepFunction;
  handleIngredientChange: CallbackIngredientFunction;
  handleNewStep: CallbackNewStep;
  handleNewRecipeIngredient: CallbackNewRecipeIngredient;
}) {
  const [ingredientInput, setIngredientInput] = useState(
    "Select ingredient..."
  );

  const [uomInput, setUomInput] = useState("Select Unit of Measure...");

  return (
    <>
      {/* Sections */}
      {
        <div
          key={sectionIndex}
          className="mt-4 rounded-md bg-primary-50 mx-auto p-4"
        >
          <h3 className="text-lg bold">Section {sectionIndex + 1}</h3>
          <div className="flex flex-row w-full gap-4">
            <div className="w-12">
              <label className="mb-2 block text-sm font-medium">Order:</label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <input
                    type="number"
                    value={section.sort_number}
                    className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    onChange={(e) =>
                      handleSectionChange(
                        sectionIndex,
                        "sort_number",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium">Name:</label>
              <div className="relative mt-2 rounded-md">
                <div className="relative h-10">
                  <input
                    type="text"
                    value={section.name}
                    className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    onChange={(e) =>
                      handleSectionChange(sectionIndex, "name", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <h4 className="text-lg">Ingredients</h4>
              <Button
                type="button"
                onClick={() => handleNewRecipeIngredient(sectionIndex)}
              >
                Add ingredient
              </Button>
              {section.recipe_ingredients_attributes.map(
                (ingredient, ingredientIndex) => (
                  <div key={ingredientIndex} className="flex flex-wrap gap-4">
                    <div className="mb-4 w-12">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Quantity:
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative h-10">
                          <input
                            type="number"
                            value={ingredient.quantity}
                            className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                            onChange={(e) =>
                              handleIngredientChange(
                                sectionIndex,
                                ingredientIndex,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 grow">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Ingredient:
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative h-10">
                          <SearchableDropdown
                            options={ingredients}
                            label="name"
                            id="id"
                            selectedVal={ingredient.ingredient_id}
                            handleChange={(value) =>
                              handleIngredientChange(
                                sectionIndex,
                                ingredientIndex,
                                "ingredient_id",
                                value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Unit of Measure:
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative h-10">
                          <SearchableDropdown
                            options={uoms}
                            label="name"
                            id="id"
                            selectedVal={ingredient.uom_id}
                            handleChange={(value) =>
                              handleIngredientChange(
                                sectionIndex,
                                ingredientIndex,
                                "uom_id",
                                value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="w-1/2">
              <h4 className="text-lg">Steps</h4>
              <Button type="button" onClick={() => handleNewStep(sectionIndex)}>
                Add step
              </Button>
              {section.steps_attributes.map((step, stepIndex) => (
                <div key={stepIndex} className="flex flex-wrap gap-4">
                  <div className="mb-4 w-12">
                    <label
                      htmlFor="number"
                      className="mb-2 block text-sm font-medium"
                    >
                      Step:
                    </label>
                    <div className="relative mt-2 rounded-md">
                      <div className="relative h-10">
                        <input
                          type="number"
                          value={step.step_number}
                          className="peer block w-full h-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                          onChange={(e) =>
                            handleStepChange(
                              sectionIndex,
                              stepIndex,
                              "step_number",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 grow">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium"
                    >
                      Description:
                    </label>
                    <div className="relative mt-2 rounded-md">
                      <div className="relative h-10">
                        <textarea
                          value={step.description}
                          className=" peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                          onChange={(e) =>
                            handleStepChange(
                              sectionIndex,
                              stepIndex,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
}
