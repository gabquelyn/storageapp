"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function Preview({ file }: { file: File }) {
  const [fileUrl, setFileUrl] = useState("");

  if (file.type.includes("image")) {
    const imageReader = new FileReader();
    imageReader.onload = (e) => {
      if (e.target) {
        setFileUrl(e.target.result as string);
      }
    };
    imageReader.readAsDataURL(file);
  }

  // if (file.type === "application/pdf") {
  //   const fileUrl = URL.createObjectURL(file);
  //   console.log(fileUrl)
  //   setFileUrl(fileUrl);
  // }

  if (file.type.includes("image") && fileUrl)
    return (
      <div className="h-[5rem] w-[5rem] overflow-hidden rounded-md relative">
        <Image src={fileUrl} fill alt={file.name} className="object-cover" />
      </div>
    );

  if (file.type === "application/pdf") return <p></p>;
}
