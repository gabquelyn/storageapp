"use client";
import React, { Suspense } from "react";
import CenterLoading from "@/app/components/CenterLoading";
import FileDisplay from "@/app/components/FilesDisplay";
import { useGetfilesQuery } from "@/app/api/features/fileApiSlice";
import Subscription from "@/app/components/Subscription";
import { CircleSpinner } from "react-spinners-kit";
import { useGetSubscriptionQuery } from "@/app/api/features/paymentSlice";
export default function Dashboard() {
  const { data, isLoading, isSuccess } = useGetfilesQuery(null);
  const {
    data: subscriptionData,
    isLoading: gettingSubscription,
    isSuccess: gotSub,
  } = useGetSubscriptionQuery(null);
  if (isLoading) return <CenterLoading />;
  if (isSuccess) {
    if (gotSub) console.log(subscriptionData.dataValues);
    return (
      <div>
        {gettingSubscription ? (
          <CircleSpinner />
        ) : gotSub && !subscriptionData?.dataValues.active ? (
          <Suspense>
            <Subscription />
          </Suspense>
        ) : (
          ""
        )}
        <FileDisplay filess={data.files} folders={data.folders} />
      </div>
    );
  }
}
