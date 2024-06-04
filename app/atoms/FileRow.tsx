"use client";
import React from "react";
import moment from "moment";
import Icon from "../components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
export default function FileRow({
  name,
  id,
  type,
  createdAt,
  updatedAt,
  size,
  filekey,
  initiateView,
}: {
  name: string;
  id: string;
  type: string;
  createdAt: string;
  filekey: string;
  updatedAt: string;
  size: number;
  initiateView: ({
    id,
    filename,
    type,
    createdAt,
    filekey,
  }: FileViewDetails) => void;
}) {
  let depth = 0;
  function calcTo(num: number) {
    if (num / 1000 < 1) {
      return num;
    }
    depth += 1;
    return calcTo(num / 1024);
  }
  const router = useRouter();

  return (
    <tr>
      <td>
        <Link href={type === "folder" ? `/dashboard/${id}` : ""}>
          <div className="flex items-center gap-2">
            <Icon type={type} />
            {<p>{name}</p>}
          </div>
        </Link>
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
            <button
              onClick={() =>
                initiateView({
                  id,
                  filename: name,
                  type: "folder",
                  createdAt,
                  filekey,
                })
              }
            >
              <IoSettingsOutline />
            </button>
          ) : (
            <button
              onClick={() =>
                initiateView({
                  id,
                  filename: name,
                  type: "file",
                  createdAt,
                  filekey,
                })
              }
            >
              <IoSettingsOutline />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
