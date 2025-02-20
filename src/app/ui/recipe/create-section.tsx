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
        <div key={sectionIndex}>
          <h3>Section {sectionIndex + 1}</h3>
          <label>
            Name:
            <input
              type="text"
              value={section.name}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "name", e.target.value)
              }
            />
          </label>
          <label>
            Sort Number:
            <input
              type="number"
              value={section.sort_number}
              onChange={(e) =>
                handleSectionChange(sectionIndex, "sort_number", e.target.value)
              }
            />
          </label>
          <h4>Steps</h4>
          <Button type="button" onClick={() => handleNewStep(sectionIndex)}>
            Add step
          </Button>
          {section.steps_attributes.map((step, stepIndex) => (
            <div key={stepIndex}>
              <label>
                Description:
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(
                      sectionIndex,
                      stepIndex,
                      "description",
                      e.target.value
                    )
                  }
                />
              </label>
              <label>
                Step Number:
                <input
                  type="number"
                  value={step.step_number}
                  onChange={(e) =>
                    handleStepChange(
                      sectionIndex,
                      stepIndex,
                      "step_number",
                      e.target.value
                    )
                  }
                />
              </label>
            </div>
          ))}
          <h4>Ingredients</h4>
          <Button
            type="button"
            onClick={() => handleNewRecipeIngredient(sectionIndex)}
          >
            Add ingredient
          </Button>
          {section.recipe_ingredients_attributes.map(
            (ingredient, ingredientIndex) => (
              <div key={ingredientIndex}>
                {/* <label>
                  ID:
                  <input
                    type="number"
                    value={ingredient.ingredient_id}
                    onChange={(e) =>
                      handleIngredientChange(
                        sectionIndex,
                        ingredientIndex,
                        "ingredient_id",
                        e.target.value
                      )
                    }
                  />
                </label> */}
                <label>ID Drop:</label>
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
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(
                        sectionIndex,
                        ingredientIndex,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Unit of Measure ID:
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
                </label>
              </div>
            )
          )}
        </div>
      }
    </>
  );
}
