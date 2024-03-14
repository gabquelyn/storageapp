import React from "react";

export default function Uploading({
  name,
  perc,
  size,
}: {
  name: string;
  perc: number;
  size: string;
}) {
  return (
    <div className="bg-white rounded-md px-8 py-2">
      <div>
        <p className="font-bold">{name}</p>
        <p className="flex items-center text-[#3276E8] font-semibold gap-2 text-[.7rem]">
          <span>{perc}%</span>
          <span>Uploading</span>
          <span>{size}</span>
        </p>
      </div>
    </div>
  );
}
