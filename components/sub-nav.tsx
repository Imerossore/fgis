"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SubNavItem } from "@/lib/types";

interface SubNavProps {
  items: SubNavItem[];
  className?: string;
}

export function SubNav({ items, className }: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("bg-background p-3 rounded-sm", className)}>
      <ul className="list-none flex gap-2 flex-wrap">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-xs text-sm font-medium transition-colors",

                  isActive
                    ? "bg-primary dark:bg-muted text-background dark:text-foreground"
                    : "dark:hover:bg-muted/80 hover:bg-primary/80 hover:text-background hover:dark:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
