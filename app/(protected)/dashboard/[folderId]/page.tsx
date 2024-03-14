"use client";
import React from "react";
import { useParams } from "next/navigation";
import FileDisplay from "@/app/components/FilesDisplay";
export default function ParticularFolder() {
  const { folderId } = useParams();
  return (
    <div>
      <FileDisplay />
    </div>
  );
}
