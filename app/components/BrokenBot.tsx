import React from "react";
import Image from "next/image";
export default function BrokenBot() {
  return (
    <div className="flex items-center justify-center h-[100svh] overflow-hidden">
      <Image
        src="/assets/images/oops.png"
        height={400}
        width={500}
        alt="Not found image"
      />
    </div>
  );
}
