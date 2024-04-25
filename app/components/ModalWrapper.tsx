import React from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed bg-[rgba(0,0,0,0.2)] inset-0 z-10 p-3 flex items-center justify-center rounded-md">
      {children}
    </div>
  );
}
