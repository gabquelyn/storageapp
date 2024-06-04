"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CgFileAdd } from "react-icons/cg";
export default function DropWrapper({
  children,
  setFiles,
}: {
  children: React.ReactNode;
  setFiles: (files: File[]) => void;
}) {
  const onDrop: OnDropCallback = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const { onClick, ...otherRootProps } = getRootProps();
  return (
    <div {...otherRootProps} className="min-h-[100vh]">
      <input {...getInputProps()} className="hidden" />
      {isDragActive && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-10">
          <div className="flex items-center justify-center h-full text-white text-[2rem]">
            <div className="flex items-center flex-col gap-2 justify-center font-bold border-2 p-8 border-dashed rounded-[1.5rem]">
              <CgFileAdd />
              <p>Drop to add files</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
