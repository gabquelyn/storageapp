"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa6";
import {
  useInitaiteShareQuery,
  useToggleVisibilityMutation,
} from "../api/features/shareApiSlice";
import { CircleSpinner } from "react-spinners-kit";
import UseFileDownload from "../utils/useFileDownload";
export default function AccessSharing({
  fileDetails,
}: {
  fileDetails: FileViewDetails;
}) {
  const { data, isLoading, isSuccess, isError } = useInitaiteShareQuery({
    ...fileDetails,
  });
  const [toggle, { isLoading: toggling }] = useToggleVisibilityMutation();
  const [copied, setCopied] = useState(false);
  const toggleVisibilty = async () => {
    try {
      await toggle({ ...fileDetails }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const copiedTimeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(copiedTimeout);
  }, [copied]);

  const { downloadFile, success } = UseFileDownload(
    fileDetails.filekey,
    fileDetails.filename
  );

  if (isLoading) return <CircleSpinner size={15} color="#000" />;
  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2">
        <p className="uppercase font-semibold">Access and Sharing</p>
        <div className="text-grey text-[.9rem] bg-slate-200 p-1 px-3 border rounded-[2rem] relative">
          <div className="flex items-center justify-between text-center w-full">
            <p className="text-nowrap overflow-hidden text-ellipsis w-[20rem]">{`${process.env.NEXT_PUBLIC_CLIENT}/share/${data.code}`}</p>

            <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_CLIENT}/share/${data.code}`}
              onCopy={() => setCopied(true)}
            >
              <button>
                <FaCopy />
              </button>
            </CopyToClipboard>
          </div>

          {copied && (
            <p className="absolute z-2 text-[.7rem] italic bg-black rounded-md p-2 text-white right-0 top-1">
              copied
            </p>
          )}
        </div>

        <button
          className="bg-white text-red-500 p-1 ring-1 ring-red-500 rounded-[2rem] w-full"
          onClick={toggleVisibilty}
        >
          {toggling ? (
            <CircleSpinner size={15} color="#ef4444" />
          ) : data.public ? (
            "Change visibility to private"
          ) : (
            "Allow public access"
          )}
        </button>

        {fileDetails.type === "file" && (
          <button
            className="bg-light-blue p-1 text-white rounded-[2rem] w-full"
            onClick={downloadFile}
          >
            Download file
          </button>
        )}
      </div>
    );
  }
  if (isError) return <p>An error eccoured!</p>;
}
