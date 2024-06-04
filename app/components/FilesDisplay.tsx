"use client";
import React, { useState, useRef } from "react";
import { VscFolderOpened } from "react-icons/vsc";
import { HiUpload } from "react-icons/hi";
import Input from "../atoms/Input";
import FilesTable from "./FilesTable";
import Search from "@/app/components/Search";
import MainArea from "@/app/components/MainArea";
import { CircleSpinner } from "react-spinners-kit";
import Uploading from "./Uploading";
import {
  useCreateFolderMutation,
  useUploadFilesMutation,
} from "../api/features/fileApiSlice";
import EditModal from "./DeleteModal";
import CenterLoading from "./CenterLoading";
import { LuFolderPlus } from "react-icons/lu";
import DropWrapper from "./DropWrapper";
export default function FileDisplay({
  filess,
  folders,
  disableFolder,
  folderName,
  folderId,
}: {
  filess: filemetaData[];
  folders: foldermetadata[];
  disableFolder?: boolean;
  folderName?: string;
  folderId?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foldername, setFolderName] = useState("");
  const [editInitiated, setEditInitiated] = useState(false);
  const [fileDetails, setFileDetails] = useState<FileViewDetails>();
  const [type, setType] = useState<"file" | "folder">("file");
  const [creatingNew, setCreatingNew] = useState(false);
  const [isError, setIsError] = useState(false);
  const [files, setFiles] = useState<FileList | File[]>();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [create, { isLoading: creatingNewFolder }] = useCreateFolderMutation();
  const [upload, { isLoading: uploadingFiles, isError: uploadingFailed }] =
    useUploadFilesMutation();

  const createFolderHandler = async () => {
    if (!foldername) return;
    try {
      await create({ foldername }).unwrap();
      setCreatingNew(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  const filesuploadHandler = async () => {
    if (files) {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
      if (folderId) formData.append("folderId", folderId);
      try {
        const res = await upload(formData).unwrap();
        console.log(res);
        setFiles(undefined);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DropWrapper setFiles={setFiles}>
      <div>
        {editInitiated && (
          <EditModal
            fileDetails={fileDetails}
            closeModal={() => setEditInitiated(false)}
          />
        )}
        <Search
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {/* main content */}
        <MainArea>
          {/* actions */}
          <div className="flex gap-3 rounded-sm items-center">
            <input
              type="file"
              multiple
              ref={fileRef}
              className="hidden"
              name="files"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length !== 0) {
                  setFiles(e.target.files);
                }
              }}
            />

            <button
              className=" p-2 px-4 flex gap-2 items-center font-semibold bg-light-blue text-white disabled:cursor-not-allowed"
              disabled={(files?.length as number) > 1}
              onClick={() => fileRef?.current?.click()}
            >
              <HiUpload />
              <p>{folderName ? `Add to ${folderName} folder` : "Add"}</p>
            </button>
            {!disableFolder && (
              <button
                className=" p-2 px-4 flex gap-2 items-center disabled:cursor-not-allowed font-semibold text-[#524A3E] bg-slate-100 shadow-sm"
                onClick={() => setCreatingNew(true)}
                disabled={creatingNew}
              >
                <VscFolderOpened />
                <p> + New folder</p>
              </button>
            )}
          </div>
          <p className="my-1 italic">Or drag and drop files to window</p>
          {/* interface to create a folder */}
          {files && (
            <div className="bg-slate-50 rounded-md p-4 mt-4">
              <div className="flex flex-col gap-2">
                {Array.from(files).map((e) => (
                  <Uploading file={e} />
                ))}
              </div>
              {uploadingFiles && <CenterLoading />}
              {uploadingFailed && (
                <p className="text-red-500">Oops! Something went wrong</p>
              )}
              <div className="flex justify-end mt-2">
                <button
                  className=" p-2 px-6 flex gap-2 items-center font-semibold bg-light-blue text-white rounded-sm disabled:cursor-not-allowed"
                  disabled={uploadingFiles}
                  onClick={filesuploadHandler}
                >
                  Upload
                </button>
              </div>
            </div>
          )}

          {creatingNew && (
            <div className="mt-[2rem] ">
              {isError && (
                <p className="text-red-500">
                  Creating folder failed, Folder {foldername} already exists
                </p>
              )}
              <div className="flex items-center gap-5">
                <Input
                  label=""
                  placeholder="Folder name"
                  value={foldername}
                  onChange={(e) => {
                    setIsError(false);
                    setFolderName(e.target.value);
                  }}
                  type="text"
                  icon={<LuFolderPlus />}
                  name="folder"
                  disableError
                />
                <button
                  className="text-white bg-light-blue p-3 font-semibold rounded-sm disabled:cursor-not-allowed"
                  disabled={!foldername || creatingNewFolder}
                  onClick={createFolderHandler}
                >
                  {creatingNewFolder ? <CircleSpinner size={15} /> : "Create"}
                </button>
                <button
                  className="text-white bg-red-500 font-semibold p-3 rounded-sm disabled:cursor-not-allowed"
                  onClick={() => setCreatingNew(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* files display should appear here */}
          <FilesTable
            files={filess.filter((file) =>
              file.originalname.includes(searchTerm)
            )}
            folders={folders.filter((folder) =>
              folder.foldername.includes(searchTerm)
            )}
            initiateView={(deleteDetails) => {
              setEditInitiated(true);
              setFileDetails(deleteDetails);
              setType(deleteDetails.type);
            }}
          />
          {/* <NotFoundAdd /> */}
          {/* if no file table */}
        </MainArea>
      </div>
    </DropWrapper>
  );
}
