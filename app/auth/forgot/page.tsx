"use client";
import React, { useState } from "react";
import Input from "@/app/atoms/Input";
import { MdOutlineEmail } from "react-icons/md";
import { useForgotMutation } from "@/app/api/features/authApiSlice";
import Image from "next/image";
import validator from "validator";
import ActionButton from "@/app/atoms/ActionButton";
export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [forgot, { isLoading, isSuccess }] = useForgotMutation();
  const forgotHandler = async () => {
    if (!validator.isEmail(email)) return;
    try {
      await forgot({ email });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full">
      {isSuccess && (
        <div className="absolute flex flex-col gap-2 items-center justify-center z-10 bg-slate-50 inset-0">
          <Image
            src="/assets/images/sent.svg"
            alt="sent image"
            height={200}
            width={340}
          />
          <p className="font-semibold text-[1.2rem]">
            Account recovery email sent!.
          </p>
          <p>Please check email to recover account.</p>
        </div>
      )}
      <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
        Recover your account
      </p>
      <Input
        icon={<MdOutlineEmail />}
        name="email"
        placeholder="example@example.com"
        type="email"
        value={email}
        label="Enter email assocaited with your account"
        onChange={(e) => setEmail(e.target.value)}
      />
       <ActionButton
          isLoading={isLoading}
          onClick={forgotHandler}
          cta="Find account"
        />
    </div>
  );
}
