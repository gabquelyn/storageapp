"use client";
import React, { useState } from "react";
import Input from "@/app/atoms/Input";
import { AiOutlineLock } from "react-icons/ai";
import { useResetMutation } from "@/app/api/features/authApiSlice";
import ActionButton from "@/app/atoms/ActionButton";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function Reset() {
  const [toggled, setToggled] = useState({
    new: false,
    confirm: false,
  });
  const [err, setErr] = useState("");
  const { token } = useParams();
  const [password, setPassword] = useState({
    new: "",
    confirm: "",
  });

  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const [reset, { isLoading, isSuccess }] = useResetMutation();
  const resetHandler = async () => {
    if (password.new !== password.confirm) {
      return setErr("Password mismatch");
    }

    if (password.new.length < 8) {
      return setErr("Password must be of 8 characters minimum");
    }

    try {
      await reset({
        password: password.new,
        token,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full relative">
      <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
        Reset Password
      </p>
      {isSuccess && (
        <div className="absolute flex flex-col gap-2 items-center justify-center z-10 bg-slate-50 inset-0">
          <Image
            src="/assets/images/reset.svg"
            alt="sent image"
            height={200}
            width={340}
          />
          <p className="font-semibold text-[1.2rem]">
            Password updated successfully!
          </p>
          <Link href="/auth/signin" className="text-light-blue underline">
            Back to login
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Input
          icon={<AiOutlineLock />}
          name="new"
          placeholder=""
          type={toggled.new ? "text" : "password"}
          value={password.new}
          label="New password"
          onChange={inputChangeHandler}
          toggle={toggled.new}
          onToggle={() => setToggled((prev) => ({ ...prev, new: !prev.new }))}
        />
        <Input
          icon={<AiOutlineLock />}
          name="confirm"
          placeholder=""
          type={toggled.confirm ? "text" : "password"}
          value={password.confirm}
          label="Confrim Password"
          onChange={inputChangeHandler}
          toggle={toggled.confirm}
          onToggle={() =>
            setToggled((prev) => ({ ...prev, confirm: !prev.confirm }))
          }
        />
        {err && <p className="text-red-500">{err}</p>}
        <ActionButton
          isLoading={isLoading}
          onClick={resetHandler}
          cta="Reset password"
        />
      </div>
    </div>
  );
}
