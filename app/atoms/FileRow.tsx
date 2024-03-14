import React from "react";
import Image from "next/image";
export default function FileRow({
  name,
  type,
}: {
  name: string;
  type: "audio" | "pdf" | "folder";
}) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          <Image
            src={`/assets/icon/${
              type === "audio" ? "audio" : type === "pdf" ? "pdf" : "folder"
            }.png`}
            width={25}
            height={25}
            alt="type"
          />
          <p>{name}</p>
        </div>
      </td>
      <td>{new Date().toDateString()}</td>
      <td>{(Math.floor(Math.random() * 12345) / 1024).toFixed(2)}KB</td>
    </tr>
  );
}
