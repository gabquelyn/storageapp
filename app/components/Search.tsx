"use client";
import React from "react";
import Input from "../atoms/Input";
import { IoSearch } from "react-icons/io5";
import Hr from "../atoms/Hr";

export default function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: InputHandler;
}) {
  return (
    <>
      <div className="flex p-3 md:p-[1rem] justify-end gap-3 items-center">
        <div className="w-[100%] md:w-[40%] relative">
          <input
            value={value}
            type="search"
            onChange={onChange}
            className="outline-none bg-slate-100 pl-8 focus:ring-1 focus:ring-grey transition-all rounded-md p-2 w-full text-balck"
            placeholder="Search file or folder"
          />
          <IoSearch className="absolute top-[50%] text-grey -translate-y-[50%] ml-2 text-[1.2rem]" />
        </div>
      </div>
      <Hr />
    </>
  );
}
