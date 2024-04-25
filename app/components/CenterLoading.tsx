import React from "react";
import { SphereSpinner } from "react-spinners-kit";
export default function CenterLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <SphereSpinner color = "#77CEEF" size = {30} />
    </div>
  );
}
