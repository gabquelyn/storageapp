import React from "react";
import Link from "next/link";
import {FaChevronRight} from "react-icons/fa"
import { usePathname } from "next/navigation";
import clsx from "clsx";
export default function Link_({
  name,
  _pathname,
}: {
  name: string;
  _pathname: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={_pathname}
      className={clsx(
        "flex items-center action justify-between",
        pathname == _pathname && "bg-light-blue text-white"
      )}
    >
      <span>{name}</span> 
    </Link>
  );
}
