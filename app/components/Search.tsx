"use client";
import React from "react";
import Input from "../atoms/Input";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
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
        <div className="w-[100%] md:w-[30%]">
          <Input
            label=""
            value={value}
            onChange={onChange}
            icon={<IoSearch className="text-grey text-[1.3rem]" />}
            placeholder="Search"
            name="search"
            type="search"
            disableError
          />
        </div>
      </div>
      <Hr />
    </>
  );
}
