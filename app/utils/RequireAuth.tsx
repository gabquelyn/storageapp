"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "../api/features/authApiSlice";
import { selectCurrentToken } from "../api/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CenterLoading from "../components/CenterLoading";
import Link from "next/link";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useSelector(selectCurrentToken);
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);
  const [refresh, { isLoading, isError, isSuccess, isUninitialized }] =
    useRefreshMutation();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
    const verifyRefreshToken = async () => {
      try {
        await refresh(null);
        setTrueSuccess(true);
      } catch (err) {
        console.log(err);
        router.replace("/auth");
      }
    };
    if (!token) {
      verifyRefreshToken();
    }
    }

    return () => {
      effectRan.current = true;
    };

    //eslint-disable-next-line
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <CenterLoading/>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <p>Login session expired</p>
        <p>
          <Link href="/auth/signin" className="underline">
            Please login again
          </Link>
        </p>
      </div>
    );
  else if (isSuccess && trueSuccess) return <>{children}</>;
  else if (token && isUninitialized) return <>{children}</>;
}
