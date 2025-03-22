"use client";

import { usePathname } from "next/navigation";

export default function PathDisplay() {
  const pathname = usePathname();

  const displayText =
    pathname === "/" ? "Dashboard" : pathname.split("/").filter(Boolean).pop();

  return <h1 className="text-2xl font-semibold">{displayText}</h1>;
}
