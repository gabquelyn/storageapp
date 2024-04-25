import React from "react";
import { CircleSpinner } from "react-spinners-kit";
export default function DeleteModal({
  closeModal,
  filename,
  isLoading,
  isError,
  onDelete
}: {
  closeModal: () => void;
  filename: string;
  isLoading: boolean;
  isError: boolean;
  onDelete: () => void
}) {
  return (
    <div className="fixed bg-[rgba(0,0,0,0.2)] inset-0 z-10 p-3 flex items-center justify-center rounded-md">
      <div className="p-8 rounded-md bg-slate-100 flex flex-col gap-2">
        <div>
          <p className="font-semibold uppercase ">Deleting file initiated</p>
          <p className="text-[.7rem] italic">Filename: {filename}</p>
        </div>
        <p className="">
          This is a{" "}
          <span className="text-red-500 font-semibold">
            destructive and irreversible action,
          </span>{" "}
          do you intend to continue?
        </p>
        <div className="flex items-center justify-between">
          <button
            className="bg-light-blue text-white p-2 rounded-md px-4"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md px-4 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={onDelete}
          >
            {isLoading ? <CircleSpinner size={15} /> : "Delete"}
          </button>
        </div>

        {isError && <div className="text-red-500">Deleting file failed!</div>}
      </div>
    </div>
  );
}
