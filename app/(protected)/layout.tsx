"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import Link_ from "../atoms/Link_";
import { useSendLogOutMutation } from "../api/features/authApiSlice";
import clsx from "clsx";
import { CircleSpinner } from "react-spinners-kit";
import { useRouter } from "next/navigation";
import RequireAuth from "../utils/RequireAuth";
import { useGetProfileQuery } from "../api/features/profileApislice";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [slideIn, setSlideIn] = useState(false);
  const router = useRouter();
  const [logout, { isLoading }] = useSendLogOutMutation();
  const {
    data,
    isLoading: gettingProfile,
    isSuccess,
  } = useGetProfileQuery(null);
  return (
    <RequireAuth>
      <div className="flex md:grid md:grid-cols-[25%_75%] h-[100vh] overflow-hidden">
        <div
          className={clsx(
            "border-ash border-r-[1px] h-[100vh] overflow-hidden p-[2rem] md:py-[3rem] fixed md:relative z-10 bg-white w-[90%] md:w-full transition-all duration-500",
            slideIn ? "-translate-x-0" : "-translate-x-[150%] md:-translate-x-0"
          )}
        >
          <div className="p-4 rounded-[.5rem] bg-blue text-white flex items-center gap-4">
            <div className="relative h-[3rem] w-[3rem] rounded-[50%] overflow-hidden">
              <Image
                src="/assets/images/holder.png"
                alt="holder image"
                fill
                className="object-cover"
              />
              <div className="absolute bg-green-600 w-2 h-2 rounded-[50%] bottom-0 left-[50%] -translate-x-[50%]"></div>
            </div>
            <div>
              <p className="font-bold text-[1.2rem] max-w-[8rem] text-nowrap overflow-hidden text-ellipsis">
                {gettingProfile ? "..." : isSuccess && data.name}
              </p>
              <p>Active</p>
            </div>
          </div>
          <nav className="flex flex-col gap-3 mt-[3rem]">
            <Link_
              name="My files"
              _pathname="/dashboard"
              onClick={() => setSlideIn(false)}
            />

            <Link_
              name="Settings"
              _pathname="/settings"
              onClick={() => setSlideIn(false)}
            />

            <button
              className="action flex items-center gap-2"
              onClick={async () => {
                await logout(null);
                router.replace("/auth/signin");
              }}
            >
              <MdLogout />
              {isLoading ? <CircleSpinner /> : <p>Log out</p>}
            </button>
          </nav>
        </div>
        <div className="w-full overflow-auto">
          <button
            className="p-3 md:hidden rounded-md text-[1.2rem] m-3 fixed z-10 bg-coffee text-white"
            onClick={() => setSlideIn((prev) => !prev)}
          >
            {slideIn ? <IoCloseSharp /> : <RiMenu2Line />}
          </button>
          <div className="mt-[4rem] md:mt-[1rem] m-[1rem]">{children}</div>
        </div>
      </div>
    </RequireAuth>
  );
}
