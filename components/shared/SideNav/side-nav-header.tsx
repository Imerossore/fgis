"use client";
import NiaLogo from "@/components/nia-logo";
import { useSideNav } from "./side-nav-context";

export default function SideNavHeader() {
  const { isExpanded } = useSideNav();
  return (
    <div className="flex justify-center items-center gap-2">
      {!isExpanded ? (
        <NiaLogo size={30} href="/" />
      ) : (
        <>
          <NiaLogo size={60} href="/" />
          <h1 className="text-5xl font-semibold text-primary dark:text-foreground">
            NIA
          </h1>
        </>
      )}
    </div>
  );
}
