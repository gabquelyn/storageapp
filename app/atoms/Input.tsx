"use client";
import { PiEyeSlashThin, PiEye } from "react-icons/pi";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
export default function Input({
  label,
  type,
  placeholder,
  value,
  name,
  onChange,
  toggle,
  onToggle,
  icon,
  disableError,
}: {
  label: string;
  placeholder?: string;
  type: string;
  value: string;
  name: string;
  onChange: InputHandler;
  toggle?: boolean;
  onToggle?: () => void;
  icon: React.ReactNode;
  disableError?: boolean;
}) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [prev, setPrev] = useState("");
  const warn = isTouched && !value;
  useEffect(() => {
    setPrev(type);
  }, []);

  return (
    <div className="w-full">
      <label className="block mb-1">{label}</label>
      <div className="relative">
        <div
          className={clsx(
            "absolute top-[50%] -translate-y-1/2  text-grey ",
            type === "search" ? "ml-2 text-[.9rem]" : "text-[1.2rem] ml-3"
          )}
        >
          {icon}
        </div>
        <input
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onBlur={() => {
            setIsTouched((prev) => !prev);
          }}
          onChange={onChange}
          className={clsx(
            "outline-none border-ash border-[1px] w-full transition-all focus:border-orange px-[3rem]",
            type === "password" && "tracking-[.5rem]",
            type === "search" ? "p-1 pl-[2rem] pr-2" : "p-3 rounded-md"
          )}
        />
        {prev == "password" && (
          <button
            className="absolute top-[50%] -translate-y-1/2 px-3 h-full right-0 text-[1.2rem] text-grey"
            onClick={onToggle}
          >
            {toggle ? <PiEyeSlashThin /> : <PiEye />}
          </button>
        )}
      </div>
      {!disableError && warn && (
        <p className="link text-[.7rem] zoo ">{name} is required</p>
      )}
    </div>
  );
}
