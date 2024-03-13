"use client";
import React, { useState } from "react";
import Input from "@/app/atoms/Input";
import Hr from "@/app/atoms/Hr";
import { IoSearch } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { VscFolderOpened } from "react-icons/vsc";
import { BsQuestionCircle } from "react-icons/bs";
import { HiUpload } from "react-icons/hi";
import FilesTable from "@/app/components/FilesTable";
export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="flex p-3 md:p-[1rem] justify-end gap-3 items-center">
        <div className="w-[100%] md:w-[30%]">
          <Input
            label=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<IoSearch className="text-grey text-[1.3rem]" />}
            placeholder="Search"
            name="search"
            type="search"
            disableError
          />
        </div>
        <IoMdNotificationsOutline className="text-[1.2rem]" />
        <BsQuestionCircle className="text-[1.2rem]" />
      </div>
      <Hr />
      {/* main content */}
      <div className="m-[1rem] md:m-[2rem]">
        <p className="font-bold mb-3 text-[1rem]">Files</p>
        {/* actions */}
        <div className="flex gap-3 items-center">
          <button className=" p-2 px-4 flex gap-2 items-center bg-coffee text-white">
            <HiUpload />
            <p>Upload</p>
          </button>
          <button className=" p-2 px-4 flex gap-2 items-center text-[#524A3E] bg-slate-100 shadow-sm">
            <IoCreateOutline />
            <p>Create</p>
          </button>
          <button className=" p-2 px-4 flex gap-2 items-center text-[#524A3E] bg-slate-100 shadow-sm">
            <VscFolderOpened />
            <p> Organise</p>
          </button>
        </div>
        {/* files display should appear here */}
        <FilesTable />
      </div>
    </div>
  );
}
