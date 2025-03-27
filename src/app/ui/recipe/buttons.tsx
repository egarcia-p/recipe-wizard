import DeleteModal from "@/app/ui/delete-modal";
import { deleteRecipe } from "@/app/lib/action";
import IngredientModal from "../ingredient-modal";

interface ConfirmProps {
  onConfirm: (ingredient: { fdcId: string; name: string }) => void;
}

export function DeleteRecipe({ id }: { id: number }) {
  const deleteRecipeWithId = deleteRecipe.bind(null, id);

  return (
    <>
      <DeleteModal onConfirm={deleteRecipeWithId} />
    </>
  );
}

export function SearchIngredient(props: ConfirmProps) {
  const { onConfirm } = props;

  return (
    <>
      <IngredientModal onConfirm={onConfirm} />
    </>
  );
}
