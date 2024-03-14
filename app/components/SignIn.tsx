"use client";
import React, { useState } from "react";
import SignWith from "@/app/atoms/SignWith";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import Link from "next/link";
import Input from "@/app/atoms/Input";
export default function SignIn() {
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
      <SignWith type="in" />
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
          <label className="flex items-center gap-1">
          <input type="checkbox" className="accent-light-blue" />
          <p className="text-light-blue text-[.8rem]">Remember me</p>
          </label>
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
        <Link href="/auth/signup" className="text-light-blue underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
