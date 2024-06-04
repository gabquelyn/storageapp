"use client";
import React from "react";
import Preview from "../utils/Preview";
export default function Uploading({ file }: { file: File }) {
  let depth = 0;

  function calcTo(num: number) {
    if (num / 1000 < 1) {
      return num;
    }
    depth += 1;
    return calcTo(num / 1024);
  }

  return (
    <div className="bg-white flex gap-8 rounded-md px-8 py-2">
      {/* <Preview file={file} /> */}
      <div>
        <p className="font-bold text-ellipsis text-nowrap w-[20rem] overflow-hidden">{file.name}</p>
        <p className="flex items-center text-[#3276E8] font-semibold gap-2 text-[.7rem]">
          <span>Approximate file size</span>
          <span>
            {" "}
            {calcTo(file.size).toFixed(2)}{" "}
            {depth == 0
              ? "B"
              : depth == 1
              ? "KB"
              : depth == 2
              ? "MB"
              : depth == 3
              ? "GB"
              : "TB"}
          </span>
        </p>
      </div>
    </div>
  );
}
