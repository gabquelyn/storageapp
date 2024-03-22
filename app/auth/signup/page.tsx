"use client";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import SignWith from "@/app/atoms/SignWith";
import { BsPerson } from "react-icons/bs";
import Input from "@/app/atoms/Input";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "@/app/atoms/ActionButton";
import { useSignUpMutation } from "@/app/api/features/authApiSlice";
import validator from "validator";
export default function SignUp() {
  const [signInDetails, setSignInDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register, { isSuccess, isLoading, isError }] = useSignUpMutation();
  const [passwordToggled, setPasswordToggles] = useState(false);
  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerHandler = async () => {
    if (
      !validator.isEmail(signInDetails.email) ||
      !signInDetails.name ||
      signInDetails.password
    )
      return;
    try {
      const res = await register({ ...signInDetails });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full relative">
      {isSuccess && (
        <div className="absolute flex flex-col gap-2 items-center justify-center z-10 bg-slate-50 inset-0">
          <Image
            src="/assets/images/sent.svg"
            alt="sent image"
            height={200}
            width={340}
          />
          <p className="font-semibold text-[1.2rem]">
            Verification email sent!.
          </p>
          <p>Please confirm your email address.</p>
        </div>
      )}

      <SignWith type="up" />
      <div className="flex flex-col gap-4">
        {isError && (
          <p className="text-red-500">
            Account already exists, try login instead
          </p>
        )}
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
        <span className="text-light-blue font-semibold">
          Terms & Conditions
        </span>
      </p>
      <ActionButton isLoading={isLoading} onClick={registerHandler} cta="Register" />
      <p className="text-[.7rem] mt-1">
        Already have an account?
        <Link href="/auth/signin" className="text-light-blue ml-2">
          Sign in
        </Link>
      </p>
    </div>
  );
}
