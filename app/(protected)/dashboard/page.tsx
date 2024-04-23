"use client";
import React from "react";
import CenterLoading from "@/app/components/CenterLoading";
import FileDisplay from "@/app/components/FilesDisplay";
import { useGetfilesQuery } from "@/app/api/features/fileApiSlice";
export default function Dashboard() {
  const { data, isLoading, isSuccess } = useGetfilesQuery(null);
  if (isLoading) return <CenterLoading />;
  if (isSuccess) {
    return (
      <div>
        <FileDisplay filess={data.files} folders={data.folders} />
      </div>
    );
  }
}
