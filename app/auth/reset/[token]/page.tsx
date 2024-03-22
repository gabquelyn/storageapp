"use client";
import React, { useState } from "react";
import Input from "@/app/atoms/Input";
import { AiOutlineLock } from "react-icons/ai";
import { useResetMutation } from "@/app/api/features/authApiSlice";
import ActionButton from "@/app/atoms/ActionButton";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Reset() {
  const [toggled, setToggled] = useState({
    new: false,
    confirm: false,
  });
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState({
    new: "",
    confirm: "",
  });

  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const [reset, { isLoading }] = useResetMutation();
  const resetHandler = async () => {
    try {
      await reset({
        password: password.new,
        token,
      });
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
        Reset Password
      </p>
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
            setToggled((prev) => ({ ...prev, confirm: !prev.new }))
          }
        />
        <ActionButton
          isLoading={isLoading}
          onClick={resetHandler}
          cta="Reset password"
        />
      </div>
    </div>
  );
}
