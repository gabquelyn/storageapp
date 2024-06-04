"use client";
import React from "react";
import Icon from "./Icon";
export default function ShareDisplay({
  size,
  mimetype,
  originalname,
}: {
  size: number;
  mimetype: string;
  originalname: string;
}) {
  let depth = 0;
  function calcTo(num: number) {
    if (num / 1000 < 1) {
      return num;
    }
    depth += 1;
    return calcTo(num / 1024);
  }

  return (
    <div className="bg-slate-50 rounded-md p-2 shadow-md flex gap-5 w-[15rem]">
      <Icon type={mimetype} className="w-10 h-10" />
      <div>
        <p className="font-semibold text-nowrap overflow-hidden text-ellipsis w-[10rem]">
          {originalname}
        </p>
        <p className="text-[.8rem]">
          {calcTo(size).toFixed(2)}{" "}
          {depth == 0
            ? "B"
            : depth == 1
            ? "KB"
            : depth == 2
            ? "MB"
            : depth == 3
            ? "GB"
            : "TB"}
        </p>
      </div>
    </div>
  );
}
