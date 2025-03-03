import DeleteModal from "@/app/ui/delete-modal";
import { deleteRecipe } from "@/app/lib/action";

export function DeleteRecipe({ id }: { id: number }) {
  const deleteRecipeWithId = deleteRecipe.bind(null, id);

  return (
    <>
      <DeleteModal onConfirm={deleteRecipeWithId} />
    </>
  );
}
