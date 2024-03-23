"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useVerifyQuery } from "@/app/api/features/authApiSlice";
import { CircleSpinner } from "react-spinners-kit";
export default function VerifyAccount() {
  const { userId, token } = useParams();
  const {  data, isSuccess, isLoading, isError } = useVerifyQuery({
    userId,
    token,
  });

  if (isSuccess) {
    return (
      <div>
        <Image
          src="/assets/images/envelope.svg"
          alt="envelope image"
          height={150}
          width={190}
        />
        <p className="font-semibold text-[1rem]">
          Email verified successfully!
        </p>
        <Link href="/auth/signin" className="text-light-blue underline">
          continue to login
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Image
          src="/assets/images/oops.svg"
          alt="oops error"
          height={150}
          width={190}
        />
        <p className="font-semibold text-[1rem]">
          OOPS! Invalid verification link.
        </p>
        <Link href="/auth" className="text-light-blue underline">
          continue to login
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return <CircleSpinner size={20} />;
  }
}
