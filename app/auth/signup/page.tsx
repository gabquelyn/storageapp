"use client";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import SignWith from "@/app/atoms/SignWith";
import { BsPerson } from "react-icons/bs";
import Input from "@/app/atoms/Input";
import Link from "next/link";
export default function SignUp() {
  const [signInDetails, setSignInDetails] = useState({
    name: "",
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
      <SignWith type="up" />
      <div className="flex flex-col gap-4">
        <Input
          icon={<BsPerson />}
          name="name"
          placeholder=""
          type="text"
          value={signInDetails.name}
          label="Name"
          onChange={inputChangeHandler}
        />
        <Input
          icon={<MdOutlineEmail />}
          name="email"
          placeholder=""
          type="email"
          value={signInDetails.email}
          label="Email address"
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
      </div>
      <p className="text-[.7rem] my-2">
        I agree to the{" "}
        <span className="text-light-blue font-semibold">Terms & Conditions</span>
      </p>
      <button className="text-white bg-light-blue p-4 rounded-lg mt-5 w-full">
        Login
      </button>
      <p className="text-[.7rem] mt-1">
        Already have an account?
        <Link href="/auth/signin" className="text-light-blue ml-2">
          Sign in
        </Link>
      </p>
    </div>
  );
}