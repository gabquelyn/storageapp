"use client";
import React from "react";
import { useParams } from "next/navigation";
import FileDisplay from "@/app/components/FilesDisplay";
import { useGetFolderFilesQuery } from "@/app/api/features/fileApiSlice";
import CenterLoading from "@/app/components/CenterLoading";

export default function ParticularFolder() {
  const { folderId } = useParams();
  const { data, isLoading, isSuccess } = useGetFolderFilesQuery(folderId);
  if (isLoading) return <CenterLoading />;
  if (isSuccess) {
    return (
      <div>
        <FileDisplay
          filess={data.files}
          folders={[]}
          disableFolder
          folderName={data.foldername}
          folderId={folderId as string}
        />
      </div>
    );
  }
}
