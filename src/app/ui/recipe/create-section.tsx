"use client";

import { Ingredient, Uom } from "@/app/types/types";
import { Button } from "../button";
import SearchableDropdown from "../searchable-dropdown";
import { SectionForm as Section } from "@/app/types/types";
import { StepForm as Step } from "../../types/types";
import { RecipeIngredientForm as RecipeIngredient } from "@/app/types/types";

type SectionField = keyof Pick<Section, "name" | "sort_number">;
type StepField = keyof Pick<Step, "description" | "step_number">;
type IngredientField = keyof Pick<
  RecipeIngredient,
  "ingredient_id" | "quantity" | "uom_id" | "name"
>;

interface CreateSectionComponentProps {
  section: Section;
  sectionIndex: number;
  uoms: Uom[];
  ingredients: Ingredient[];
  handleSectionChange: (
    index: number,
    field: SectionField,
    value: string | number
  ) => void;
  handleStepChange: (
    sectionIndex: number,
    stepIndex: number,
    field: StepField,
    value: string | number
  ) => void;
  handleIngredientChange: (
    sectionIndex: number,
    ingredientIndex: number,
    field: IngredientField,
    value: string | number | null
  ) => void;
  handleNewStep: (sectionIndex: number) => void;
  handleNewRecipeIngredient: (sectionIndex: number) => void;
}

export function CreateSectionComponent({
  section,
  sectionIndex,
  uoms,
  ingredients,
  handleSectionChange,
  handleStepChange,
  handleIngredientChange,
  handleNewStep,
  handleNewRecipeIngredient,
}: CreateSectionComponentProps) {
  return (
    <>
      {/* Sections */}
      {
        <div
          key={sectionIndex}
          className="mt-4 rounded-md bg-primary-50 mx-auto p-4"
        >
          {section.id && (
            <input id="id" name="id" type="hidden" value={section.id} />
          )}
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
          <div className="mt-4 flex flex-row gap-4">
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
                  <div
                    key={ingredientIndex}
                    className="py-2 flex flex-wrap gap-4"
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Ingredient:
                      </label>
                      <div className="relative mt-2 rounded-md">
                        <div className="relative h-10 w-60">
                          <SearchableDropdown
                            options={ingredients}
                            id="ingredient-dropdown"
                            selectedVal={ingredient.ingredient_id}
                            handleChange={(value: number | null) => {
                              handleIngredientChange(
                                sectionIndex,
                                ingredientIndex,
                                "ingredient_id",
                                value
                              );
                              // Find selected ingredient name to update the name field if needed or just for display
                              // But usually we just store ID. However, the data model stores name too?
                              // Let's assume we maintain name for now or just rely on ID.
                              // Previous code set Name too.
                              const selected = ingredients.find(
                                (i) => i.id === value
                              );
                              if (selected) {
                                handleIngredientChange(
                                  sectionIndex,
                                  ingredientIndex,
                                  "name",
                                  selected.name
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {ingredient.id && (
                      <input
                        id="id"
                        name="id"
                        type="hidden"
                        value={ingredient.id}
                      />
                    )}
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
                            id="id"
                            selectedVal={ingredient.uom_id}
                            handleChange={(value: number | null) =>
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
                <div key={stepIndex} className="py-2 flex flex-wrap gap-4">
                  {step.id && (
                    <input id="id" name="id" type="hidden" value={step.id} />
                  )}
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
