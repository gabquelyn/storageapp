import React from "react";
import moment from "moment";
import Icon from "../components/Icon";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
export default function FileRow({
  name,
  id,
  type,
  createdAt,
  updatedAt,
  size,
}: {
  name: string;
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  size: number;
}) {
  let depth = 0;

  function calcTo(num: number) {
    if (num / 1000 < 1) {
      return num;
    }
    depth += 1;
    return calcTo(num / 1024);
  }
  const router = useRouter()
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
        {type === "folder" ? (
          <button onClick={() => router.push(`/dashboard/${id}`)}>
            <IoMdArrowForward />
          </button>
        ) : (
          <button>
            <AiOutlineDownload />
          </button>
        )}
      </td>
    </tr>
  );
}
