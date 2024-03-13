"use client";
import React, { useState } from "react";
import Input from "../atoms/Input";
import { AiOutlineLock } from "react-icons/ai";
export default function Password() {
  const [passwordDetails, setPasswordDetails] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [passwordToggled, setPasswordToggled] = useState<{
    [key: string]: boolean;
  }>({
    new: false,
    confirm: false,
    current: false,
  });

  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prev) => ({ ...prev, [name]: value }));
  };

  const passwordToggleHandler = (name: string) => {
    setPasswordToggled((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-slate-100 w-full rounded-md p-7 zoom">
      <div className="flex flex-col gap-3">
        <Input
          icon={<AiOutlineLock />}
          name="current"
          placeholder=""
          type={passwordToggled.current ? "text" : "password"}
          value={passwordDetails.current}
          label="Current Password"
          onChange={inputChangeHandler}
          toggle={passwordToggled.current}
          onToggle={() => passwordToggleHandler("current")}
        />
        <Input
          icon={<AiOutlineLock />}
          name="new"
          placeholder=""
          type={passwordToggled.new ? "text" : "password"}
          value={passwordDetails.new}
          label="New Password"
          onChange={inputChangeHandler}
          toggle={passwordToggled.new}
          onToggle={() => passwordToggleHandler("new")}
        />
        <Input
          icon={<AiOutlineLock />}
          name="confirm"
          placeholder=""
          type={passwordToggled.confirm ? "text" : "password"}
          value={passwordDetails.confirm}
          label="Confirm Password"
          onChange={inputChangeHandler}
          toggle={passwordToggled.confirm}
          onToggle={() => passwordToggleHandler("confirm")}
        />
      </div>
      <div className="flex justify-end my-4">
        <button className="bg-blue text-white p-3 px-8 rounded-md">Update password</button>
      </div>
    </div>
  );
}
