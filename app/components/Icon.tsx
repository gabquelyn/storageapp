import React from "react";
import Image from "next/image";
export default function Icon({ type }: { type: string }) {
  return (
    <div>
      <Image
        src={`/assets/icon/${
          type == "folder"
            ? "folder"
            : type.includes("image")
            ? "image"
            : type.includes("audio")
            ? "audio"
            : type.includes("application/pdf")
            ? "pdf"
            : type.includes("text/html")
            ? "html"
            : type.includes("application/vnd.ms-powerpoint") ||
              type.includes(
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
              )
            ? "ppt"
            : type.includes("svg")
            ? "svg"
            : type.includes("text/plain")
            ? "txt"
            : type.includes("video")
            ? "video"
            : type.includes("application/vnd.ms-excel") ||
              type.includes(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              )
            ? "xsxl"
            : type.includes(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ) || type.includes("application/msword")
            ? "word"
            : type.includes("adobe")
            ? "psd"
            : type.includes("zip") ||
              type.includes("compressed") ||
              type.includes("zip")
            ? "rar"
            : "unknown"
        }.png`}
        width={25}
        height={25}
        alt="type"
      />
    </div>
  );
}
