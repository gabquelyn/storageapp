"use client";
import React from "react";
import moment from "moment";
import Icon from "../components/Icon";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../api/authSlice";
import axios from "axios";
export default function FileRow({
  name,
  id,
  type,
  createdAt,
  updatedAt,
  size,
  filekey,
  initiateDelete,
}: {
  name: string;
  id: string;
  type: string;
  createdAt: string;
  filekey: string;
  updatedAt: string;
  size: number;
  initiateDelete: ({
    id,
    filename,
    type,
  }: {
    id: string;
    filename: string;
    type: "file" | "folder";
  }) => void;
}) {
  let depth = 0;
  const accessToken = useSelector(selectCurrentToken);
  function calcTo(num: number) {
    if (num / 1000 < 1) {
      return num;
    }
    depth += 1;
    return calcTo(num / 1024);
  }
  const router = useRouter();

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/file/download/${filekey}`,
        {
          responseType: "blob", // Set the response type to blob
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);

      // Click the link to initiate download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          <Icon type={type} />
          <p>{name}</p>
        </div>
      </td>
      <td>{moment(createdAt).format("YYYY-MM-DD HH-mm")}</td>
      <td>
        {calcTo(size).toFixed(2)}{" "}
        {depth == 0
          ? "B"
          : depth == 1
          ? "KB"
          : depth == 2
          ? "MB"
          : depth == 3
          ? "GB"
          : "TB"}
      </td>
      <td>
        <div>
          {type == "folder" ? (
            <div className="flex gap-3">
              <button onClick={() => router.push(`/dashboard/${id}`)}>
                <IoMdArrowForward />
              </button>
              {size == 0 && (
                <button
                  onClick={() =>
                    initiateDelete({ id, filename: name, type: "folder" })
                  }
                >
                  <RiDeleteBin5Line />
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={downloadFile}>
                <AiOutlineDownload />
              </button>
              <button
                onClick={() =>
                  initiateDelete({ id, filename: name, type: "file" })
                }
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
