"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import Personal from "@/app/components/Personal";
import Password from "@/app/components/Password";
import clsx from "clsx";
export default function Settings() {
  const [show, setShow] = useState(0);
  return (
    <div className="m-[1rem] md:m-[4rem]">
      <p className="font-bold text-[1.2rem] mb-[3rem]">Account settings</p>

      <div className="grid grid-cols-1 md:grid-cols-[28%_66%] gap-5 md:gap-10">
        <div className="bg-slate-100 p-5">
          <div className="relative h-[7rem] w-[7rem] my-[2rem] rounded-[50%] overflow-hidden">
            <Image src="/assets/images/holder.png" alt="holder image" fill />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center text-white text-[2rem]">
              <LuImagePlus />
            </div>
          </div>
          <div className="flex flex-row justify-between md:justify-center md:flex-col gap-3">
            <button
              className={clsx("action", show == 0 && "bg-light-blue text-white")}
              onClick={() => setShow(0)}
            >
              Personal Information
            </button>
            <button
              className={clsx("action", show == 1 && "bg-light-blue text-white")}
              onClick={() => setShow(1)}
            >
              Security
            </button>
            <button className="action">Plans</button>
          </div>
        </div>
        <div>{show === 0 ? <Personal /> : show === 1 ? <Password /> : ""}</div>
      </div>
    </div>
  );
}
