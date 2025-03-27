"use client";

import React from "react";
import IconButton from "./icon-button";
import { PlusIcon } from "@heroicons/react/24/outline";
import IngredientConfirm from "./ingredient-dialog";

interface Props {
  onConfirm: (ingredient: { fdcId: string; name: string }) => void;
  //TODO change ingredient to be a type def
}

export default function IngredientModal(props: Props) {
  const { onConfirm } = props;
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div>
      <IconButton
        className="rounded-md h-10  bg-primary-900 px-4 text-sm font-medium text-primary-50   border p-2 hover:text-primary-900 hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:bg-primary-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        aria-label="delete"
        onClick={() => setConfirmOpen(true)}
      >
        <PlusIcon className="w-5" />
      </IconButton>
      <IngredientConfirm
        title="Search Ingredient:"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      >
        Select Ingredient
      </IngredientConfirm>
    </div>
  );
}
