"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../api/authSlice";
export default function UseFileDownload(filekey: string, filename: string) {
  const accessToken = useSelector(selectCurrentToken);
  const [success, setSuccess] = useState(false);
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
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      // Click the link to initiate download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setSuccess(true);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return { downloadFile, success };
}
