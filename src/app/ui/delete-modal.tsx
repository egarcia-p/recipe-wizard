"use client";

import React from "react";
import IconButton from "./icon-button";
import ConfirmDialog from "./confirm-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  onConfirm: () => void;
}

export default function DeleteModal(props: Props) {
  const { onConfirm } = props;
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  return (
    <div>
      <IconButton
        className="rounded-md h-10  bg-primary-900 px-4 text-sm font-medium text-primary-50   border p-2 hover:text-primary-900 hover:bg-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:bg-primary-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        aria-label="delete"
        onClick={() => setConfirmOpen(true)}
      >
        <TrashIcon className="w-5" />
      </IconButton>
      <ConfirmDialog
        title="Delete Transaction?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onConfirm()}
      >
        Are you sure you want to delete this transaction?
      </ConfirmDialog>
    </div>
  );
}
