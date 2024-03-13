import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function Link_({
  name,
  _pathname,
  onClick
}: {
  name: string;
  _pathname: string;
  onClick: () => void
}) {
  const pathname = usePathname();
  return (
    <Link
      href={_pathname}
      className={clsx(
        "flex items-center action justify-between",
        pathname == _pathname && "bg-blue text-white"
      )}
    >
      <span>{name}</span> 
    </Link>
  );
}
