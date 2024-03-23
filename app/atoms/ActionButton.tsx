import React from "react";
import { CircleSpinner } from "react-spinners-kit";
export default function ActionButton({
  isLoading,
  onClick,
  cta,
}: {
  isLoading: boolean;
  onClick: () => void;
  cta: string;
}) {
  return (
    <button
      className="text-white flex items-center justify-center bg-light-blue p-4 rounded-lg mt-5 w-full disabled:cursor-not-allowed"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <CircleSpinner size={20} /> : <p>{cta}</p>}
    </button>
  );
}
