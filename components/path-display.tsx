"use client";

import { usePathname } from "next/navigation";

export default function PathDisplay() {
  const pathname = usePathname();

  const baseRoute = pathname
    .split("/")[1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <h1 className="text-2xl font-semibold text-background dark:text-foreground">
      {baseRoute}
    </h1>
  );
}
