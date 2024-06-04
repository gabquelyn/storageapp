"use client";
import React from "react";
import ShareDisplay from "@/app/components/ShareDisplay";
import { useShareDetailsQuery } from "@/app/api/features/shareApiSlice";
import { useParams } from "next/navigation";
import BrokenBot from "@/app/components/BrokenBot";
import CenterLoading from "@/app/components/CenterLoading";
export default function SharePage() {
  const { key } = useParams();
  const { data, isLoading, isError, isSuccess } = useShareDetailsQuery(
    key as string
  );

  if (isLoading) return <CenterLoading />;
  if (isSuccess) {
    return (
      <div className="flex items-center justify-center rounded-lg h-[100vh]">
        <div  className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-light-blue p-4 rounded-lg">
          {data.map((item) => (
            <ShareDisplay
              size={item.size}
              key={item.id}
              mimetype={item.mimetype}
              originalname={item.originalname}
            />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <BrokenBot />;
}
