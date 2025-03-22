"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSideNav } from "./side-nav-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from "@/lib/types";

export function NavLink({ href, name, icon: Icon, exact = false }: NavItem) {
  const pathname = usePathname();
  const { isExpanded } = useSideNav();

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href) && href !== "/"
    ? true
    : pathname === href;

  const LinkContent = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg transition-all duration-200",
        "hover:bg-white/20 dark:hover:bg-white/10",
        "group relative overflow-hidden",
        !isExpanded && "justify-center p-3",
        isActive
          ? "bg-white/30 dark:bg-white/15 text-foreground font-medium"
          : "text-foreground/70"
      )}
    >
      {isActive && (
        <div
          className={cn(
            "absolute left-0 top-1/4 h-1/2 w-1 bg-primary rounded-r-full",
            !isExpanded &&
              "left-1/4 top-0 h-1 w-1/2 rounded-b-full rounded-t-none"
          )}
        />
      )}

      <div
        className={cn(
          "h-6 w-6",
          isActive ? "text-primary" : "text-primary/70 group-hover:text-primary"
        )}
      >
        <Icon />
      </div>

      {isExpanded && <span>{name}</span>}

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
      )}
    </Link>
  );

  // If not expanded, wrap in tooltip
  if (!isExpanded) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{LinkContent}</div>
          </TooltipTrigger>
          <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // If expanded, just return the link
  return LinkContent;
}
