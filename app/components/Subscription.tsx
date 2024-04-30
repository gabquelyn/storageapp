"use client";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useSubscribeMutation } from "../api/features/paymentSlice";
import { CircleSpinner } from "react-spinners-kit";
import { useRouter } from "next/navigation";
export default function Subscription() {
  const [action, { isLoading }] = useSubscribeMutation();
  const router = useRouter();
  const subscribeHandler = async () => {
    try {
      const res = await action(null).unwrap();
      router.push(res.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalWrapper>
      <div className="bg-slate-50 rounded-md p-5 flex flex-col gap-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <br /> Quibusdam repellendus vero iure ut ratione molestias pariatur
          dolorum odio! 7 days free trial.
        </p>
        <p className="">
          Continuing with us means you have agreed to our terms and conditions
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue p-3 px-5 rounded-md text-white disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={subscribeHandler}
          >
            {isLoading ? <CircleSpinner size={20} /> : "Subscribe"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
