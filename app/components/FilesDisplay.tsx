"use client";
import React, { useState } from "react";
import { VscFolderOpened } from "react-icons/vsc";
import { HiUpload } from "react-icons/hi";
import NotFoundAdd from "./NotFoundAdd";
import Search from "@/app/components/Search";
import MainArea from "@/app/components/MainArea";
export default function FileDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Search
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {/* main content */}
      <MainArea>
        <p className="font-bold mb-3 text-[1rem]">Files</p>
        {/* actions */}
        <div className="flex gap-3 items-center">
          <button className=" p-2 px-4 flex gap-2 items-center bg-coffee text-white">
            <HiUpload />
            <p>Upload</p>
          </button>
          <button className=" p-2 px-4 flex gap-2 items-center text-[#524A3E] bg-slate-100 shadow-sm">
            <VscFolderOpened />
            <p> Organise</p>
          </button>
        </div>
        {/* files display should appear here */}
        {/* <FilesTable /> */}
        <NotFoundAdd />
        {/* if no file table */}
      </MainArea>
    </div>
  );
}
