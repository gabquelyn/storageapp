"use client";
import React, { useState, useEffect } from "react";
import SignWith from "@/app/atoms/SignWith";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import ModalWrapper from "./ModalWrapper";
import Link from "next/link";
import Input from "@/app/atoms/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "../api/features/authApiSlice";
import { setCredentials } from "../api/authSlice";
import { useDispatch } from "react-redux";
import ActionButton from "../atoms/ActionButton";
import validator from "validator";

export default function SignIn() {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const countDown = setTimeout(() => setDisplay(false), 3000);
    return () => clearTimeout(countDown);
  }, []);

  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const [passwordToggled, setPasswordToggles] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const inputChangeHandler: InputHandler = (e) => {
    setErr("");
    const { name, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  const sus = params.get("success");

  const loginHandler = async () => {
    if (!validator.isEmail(signInDetails.email) || !signInDetails.password)
      return;
    try {
      const res = await login({ ...signInDetails }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push("/dashboard");
    } catch (err) {
      if ((err as CustomError).status === 404) {
        setErr("Oops! Account does not exist");
      }
      if ((err as CustomError).status === 401) {
        setErr("Invalid email or password!");
      }
      if ((err as CustomError).status === 400) {
        setErr("Account not verified, check email to verify!");
      }
      setSignInDetails({
        email: "",
        password: "",
      });
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {sus === "true" && display && (
        <ModalWrapper>
          <div className="bg-slate-50 rounded-md p-8 flex flex-col gap-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque quibusdam, dicta eius laboriosam nesciunt quasi?
            </p>
            <p className="text-green-500 font-semibold">
              Successfully Subscribed to our storage services.
            </p>
            <p>Please, Login again to verify your identity.</p>
          </div>
        </ModalWrapper>
      )}
      <SignWith type="in" />
      <div className="flex flex-col gap-4">
        {err && <p className="text-red-500">{err}</p>}
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
          <Link
            className="text-light-blue underline text-[.8rem]"
            href="/auth/forgot"
          >
            Forgot Password?
          </Link>
        </div>
        <ActionButton
          isLoading={isLoading}
          onClick={loginHandler}
          cta="Login"
        />
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
