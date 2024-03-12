"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import Link from "next/link";
import Input from "@/app/atoms/Input";
export default function SignUp() {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const [passwordToggled, setPasswordToggles] = useState(false);
  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full">
      <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
        Hi! welcome back
      </p>
      <button className="border-[1px] p-3 rounded-lg flex w-full items-center justify-center gap-4 font-semibold">
        <FcGoogle className="text-[1.5rem]" /> <p>Sign in with Google</p>
      </button>
      <div className="my-4 flex items-center justify-center gap-4 text-grey text-[.7rem]">
        <div className=" bg-ash h-[1px] w-full"></div>
        <p className="whitespace-nowrap">Or sign in with email</p>
        <div className=" bg-ash h-[1px] w-full"></div>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          icon={<MdOutlineEmail />}
          name="email"
          placeholder=""
          type="email"
          value={signInDetails.email}
          label="Email"
          onChange={inputChangeHandler}
        />
        <Input
          icon={<AiOutlineLock />}
          name="password"
          placeholder=""
          type={passwordToggled ? "text" : "password"}
          value={signInDetails.password}
          label="Password"
          onChange={inputChangeHandler}
          toggle={passwordToggled}
          onToggle={() => setPasswordToggles((prev) => !prev)}
        />
        <div className="flex items-center justify-between">
          <input type="checkbox" className="accent-light-blue" />
          <Link className="text-light-blue underline text-[.8rem]" href="">
            Forgot Password?
          </Link>
        </div>
        <button className="text-white bg-light-blue p-4 rounded-lg mt-5 w-full">
          Login
        </button>
      </div>

      <p className="text-[.8rem] my-2">
        Not registered?{" "}
        <Link href="" className="text-light-blue underline">Create an account</Link>
      </p>
    </div>
  );
}
