"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./icon-button";
interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export default function Dialog(props: Props) {
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white border border-gray-200 w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{props.children}</div>
        <span className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => onClose()}>
            <XMarkIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
}
