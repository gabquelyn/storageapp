"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import Hr from "../atoms/Hr";
import Link from "next/link";
import clsx from "clsx";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [slideIn, setSlideIn] = useState(false);
  return (
    <div className="flex md:grid md:grid-cols-[25%_75%] h-[100vh] overflow-hidden">
      <div
        className={clsx(
          "border-ash border-r-[1px] h-[100vh] overflow-hidden p-[2rem] md:py-[3rem] fixed md:relative z-10 bg-white w-[90%] md:w-full transition-all duration-500",
          slideIn ? "-translate-x-0" : "-translate-x-[150%] md:-translate-x-0"
        )}
      >
        <div className="p-4 rounded-[.5rem] bg-blue text-white flex items-center gap-4">
          <div className="relative h-[3rem] w-[3rem] rounded-[50%] overflow-hidden">
            <Image src="/assets/images/holder.png" alt="holder image" fill />
            <div className="absolute bg-green-600 w-2 h-2 rounded-[50%] bottom-0 left-[50%] -translate-x-[50%]"></div>
          </div>
          <div>
            <p className="font-bold text-[1.2rem]">Sarah Jones</p>
            <p>Active</p>
          </div>
        </div>
        <nav className="flex flex-col gap-3 mt-[3rem]">
          <p className="flex items-center justify-between">
            <span>My Files</span> <FaChevronRight className="text-grey" />
          </p>
          <Hr />

          <p className="flex items-center justify-between">
            <span>New Folder</span>
            <FaChevronRight className="text-grey" />
          </p>
          <Hr />
          <p className="flex items-center justify-between">
            <span>New File </span>
            <FaChevronRight className="text-grey" />
          </p>
          <Hr />
          <Link href="/settings" className="flex gap-2">
            <FiSettings />
            Settings
          </Link>
          <p className="flex gap-2">
            <MdLogout />
            Log out
          </p>
        </nav>
      </div>
      <div className="w-full overflow-auto">
        <button
          className="p-3 md:hidden text-[1.2rem] m-3 fixed z-10 bg-coffee text-white"
          onClick={() => setSlideIn((prev) => !prev)}
        >
          {slideIn ? <LuChevronsLeft /> : <LuChevronsRight />}
        </button>
        <div className="mt-[4rem] md:mt-[1rem] m-[1rem]">{children}</div>
      </div>
    </div>
  );
}
