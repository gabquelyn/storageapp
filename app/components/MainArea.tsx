import React from "react";
export default function MainArea({ children }: { children: React.ReactNode }) {
  return <div className="m-[1rem] md:m-[2rem]"> {children}</div>;
}
