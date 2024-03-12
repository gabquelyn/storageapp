import React from "react";
import { FcGoogle } from "react-icons/fc";
export default function SignWith({ type }: { type: "in" | "up" }) {
  return (
    <>
      <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
        Hi! welcome back
      </p>
      <button className="border-[1px] p-3 rounded-lg flex w-full items-center justify-center gap-4 font-semibold">
        <FcGoogle className="text-[1.5rem]" /> <p>Sign {type} with Google</p>
      </button>
      <div className="my-4 flex items-center justify-center gap-4 text-grey text-[.7rem]">
        <div className=" bg-ash h-[1px] w-full"></div>
        <p className="whitespace-nowrap">Or sign {type} with email</p>
        <div className=" bg-ash h-[1px] w-full"></div>
      </div>
    </>
  );
}
