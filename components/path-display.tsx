"use client";

import { usePathname } from "next/navigation";

export default function PathDisplay() {
  const pathname = usePathname();

  const displayText =
    pathname === "/"
      ? "Dashboard"
      : pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  return (
    <h1 className="text-2xl font-semibold text-background dark:text-foreground">
      {displayText}
    </h1>
  );
}
