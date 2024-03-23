"use client"
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="px-[2rem] md:px-[3rem] lg:px-[8rem] pt-[5rem] md:pt-0 flex items-center justify-center  overflow-hidden">
        {children}
      </div>
      <div className="hidden md:flex background text-white p-16">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"></div>
        <div className="z-10">
          <p className="text-[1.3rem] font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            nobis totam est culpa et!
          </p>
          <p className="mt-3">- Kerlis Dweck</p>
        </div>
      </div>
    </div>
  );
}
