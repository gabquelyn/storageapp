"use client";
import React, { useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import ModalWrapper from "./ModalWrapper";
import AccessSharing from "./AccessSharing";
import moment from "moment";
import { FaSkull } from "react-icons/fa";
import {
  useDeleteFileMutation,
  useDeleteFolderFilesMutation,
} from "../api/features/fileApiSlice";
import { FaTimes } from "react-icons/fa";
export default function DeleteModal({
  closeModal,
  fileDetails,
}: {
  closeModal: () => void;
  fileDetails?: FileViewDetails;
}) {
  const [deletFile, { isLoading: deletingFile, isError: deletingFileFailed }] =
    useDeleteFileMutation();
  const [
    deletFolder,
    { isLoading: deletingFolder, isError: deletingFolderFailed },
  ] = useDeleteFolderFilesMutation();
  const [term, setTerm] = useState("");
  const fileDeleteHandler = async () => {
    try {
      if (fileDetails?.type === "file")
        await deletFile(fileDetails!.id).unwrap();
      else await deletFolder(fileDetails!.id).unwrap();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalWrapper>
      <div className=" bg-slate-100 p-8 pb-10 rounded-md max-w-[90%]">
        <div className="flex justify-end">
          <button
            className="text-grey p-2 rounded-md px-4"
            onClick={closeModal}
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-semibold uppercase mb-2">
              {fileDetails?.type === "folder" ? "Foldername:" : "Filename"}{" "}
              {fileDetails?.filename}
            </p>
            <div className="text-[.9rem]">
              {fileDetails?.type === "file" && (
                <p>Filekey: {fileDetails?.filekey}</p>
              )}
              <p>
                Created:{" "}
                {moment(fileDetails?.createdAt).format("YYYY mm dddd mm:hh:ss")}
              </p>
            </div>
          </div>

          {/* handle the sharing of the files */}
          <AccessSharing fileDetails={fileDetails!} />
          {/* handle file deletion */}
          <div className="flex flex-col gap-2">
            <p className="uppercase font-semibold flex gap-1 items-center text-red-500">
              Danger zone <FaSkull />
            </p>

            <input
              className="w-full placeholder:text-[.8rem] placeholder:italic p-2 rounded-md outline-0 ring-1 ring-red-500"
              placeholder="type 'delete' to complete deletion"
              onChange={(e) => setTerm(e.target.value)}
            />
            <button
              className="bg-red-500 p-1 text-white rounded-[2rem] w-full disabled:cursor-not-allowed"
              onClick={fileDeleteHandler}
              disabled={deletingFile || deletingFolder || term !== "delete"}
            >
              {deletingFile || deletingFolder ? (
                <CircleSpinner size={15} />
              ) : (
                <p>Complete deletion</p>
              )}
            </button>
          </div>

          {(deletingFileFailed || deletingFolderFailed) && (
            <div className="text-red-500">Deletion failed!</div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
