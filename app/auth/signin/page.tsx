import React, { Suspense } from "react";
import SignIn from "@/app/components/SignIn";
export default function page() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}
