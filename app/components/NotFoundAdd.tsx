import React from "react";
import { HiUpload } from "react-icons/hi";
import Uploading from "./Uploading";
export default function NotFoundAdd() {
  return (
    <div className="flex flex-col gap-8 items-center text-center mt-10 rounded-lg justify-center h-[50vh] bg-slate-100">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="font-semibold text-[1rem]">The folder is empty</p>
        <p>Drag and drop files unto this window to upload</p>
        <button className="rounded-md p-2 px-4 flex gap-2 items-center bg-coffee text-white">
          <HiUpload />
          <p>Upload file</p>
        </button>
      </div>
        <Uploading name="sikd.pdf" perc={45} size={"34.2MB"} />
    </div>
  );
}
