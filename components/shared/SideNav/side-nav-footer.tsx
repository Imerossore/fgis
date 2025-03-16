"use client";
import { useSideNav } from "./side-nav-context";

export default function SideNavFooter() {
  const { isExpanded } = useSideNav();
  return (
    <div className="text-xs text-muted-foreground">
      {!isExpanded ? (
        <span>&copy; {new Date().getFullYear()}</span>
      ) : (
        <span>&copy; {new Date().getFullYear()} FGIS</span>
      )}
    </div>
  );
}
