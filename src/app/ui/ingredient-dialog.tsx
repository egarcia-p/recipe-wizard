"use client";

import { useState } from "react";
import { Button } from "./button";
import Dialog from "./dialog";
import SearchableDropdown from "./searchable-dropdown";
import { searchUSDAIngredients } from "../lib/data";
import { USDA_Ingredient } from "../types/types";
interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: (ingredient: { fdcId: string; name: string }) => void;
}

export default function IngredientConfirm(props: Props) {
  const [ingredients, setIngredients] = useState<
    { id: number; name: string }[]
  >([]);
  const [query, setQuery] = useState("");
  const [fdcId, setFdcId] = useState("");
  const [name, setName] = useState("");

  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  const handleSearch = async () => {
    console.log("searching for", query);
    const searchResult = await searchUSDAIngredients(query);

    const usdaIngredients: USDA_Ingredient[] = searchResult.foods;
    const ingredientsMap = usdaIngredients.map((ingredient) => {
      return {
        id: ingredient.fdcId,
        name: ingredient.description,
      };
    });

    console.log("ingredients");
    console.log(ingredientsMap);
    setIngredients(ingredientsMap);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <input
            type="text"
            name="query"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <Button
            onClick={handleSearch}
            className="bg-primary-600 hover:bg-primary-300"
          >
            Search
          </Button>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Ingredient:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative h-10">
              <SearchableDropdown
                options={ingredients}
                id="id"
                selectedVal={fdcId}
                handleChange={(value: string | number | null) => {
                  if (value === null) {
                    setFdcId("");
                    setName("");
                  } else {
                    const stringValue = value.toString();
                    setFdcId(stringValue);
                    setName(
                      ingredients.find((i) => i.id == parseInt(stringValue))
                        ?.name || ""
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-red-600 hover:bg-red-300"
          >
            Cancel
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose();
              onConfirm({ fdcId: fdcId, name: name });
            }}
            className="bg-primary-600 hover:bg-primary-300"
          >
            Select
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
