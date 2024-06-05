"use client";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { CircleSpinner } from "react-spinners-kit";
import { BsPerson } from "react-icons/bs";
import Input from "@/app/atoms/Input";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "@/app/atoms/ActionButton";
import { useSignUpMutation } from "@/app/api/features/authApiSlice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useOAuthRegisterMutation } from "@/app/api/features/authApiSlice";
import validator from "validator";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const [signInDetails, setSignInDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register, { isSuccess, isLoading, isError }] = useSignUpMutation();
  const [
    oAuthRegiste,
    { isLoading: oAuthRegistering, isError: oAuthRegisterFailed },
  ] = useOAuthRegisterMutation();
  const router = useRouter();
  const [passwordToggled, setPasswordToggles] = useState(false);
  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setSignInDetails((prev) => ({ ...prev, [name]: value }));
  };

  const registerHandler = async () => {
    if (
      !validator.isEmail(signInDetails.email) ||
      !signInDetails.name ||
      signInDetails.password.length < 8
    )
      return;
    try {
      await register({ ...signInDetails });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleSucessHandler = async (response: CredentialResponse) => {
    try {
      await oAuthRegiste({ ...response }).unwrap();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const googleErrorHandler = async () => {};

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

      <div className="flex items-center justify-center flex-col">
        <p className="font-semibold text-[1.4rem] mb-10 capitalize text-center md:text-left">
          Hi! welcome back
        </p>
        {oAuthRegistering ? (
          <CircleSpinner size={25} color="#77CEEF" />
        ) : (
          <GoogleLogin
            onSuccess={googleSucessHandler}
            text="signup_with"
            onError={googleErrorHandler}
            width={300}
            shape="pill"
          />
        )}

        <div className="my-4 w-full flex items-center justify-center gap-4 text-grey text-[.7rem]">
          <div className=" bg-ash h-[1px] w-full"></div>
          <p className="whitespace-nowrap">Or sign up with email</p>
          <div className=" bg-ash h-[1px] w-full"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isError ||
          (oAuthRegisterFailed && (
            <p className="text-red-500">
              Account already exists, try login instead
            </p>
          ))}
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
        {signInDetails.password.length < 8 && (
          <p className="text-orange-500">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      <p className="text-[.7rem] my-2">
        I agree to the{" "}
        <span className="text-light-blue font-semibold">
          Terms & Conditions
        </span>
      </p>
      <ActionButton
        isLoading={isLoading}
        onClick={registerHandler}
        cta="Register"
      />
      <p className="text-[.7rem] mt-1">
        Already have an account?
        <Link href="/auth/signin" className="text-light-blue ml-2">
          Sign in
        </Link>
      </p>
    </div>
  );
}
