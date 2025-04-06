"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SubNavItem } from "@/lib/types";
import { Button } from "./ui/button";
import { Undo2 } from "lucide-react";

interface SubNavProps {
  items: SubNavItem[];
  className?: string;
  back?: boolean;
}

export function SubNav({ items, className, back }: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("bg-background p-3 rounded-sm flex-1", className)}>
      <ul className="list-none flex gap-2 flex-wrap ">
        {back && (
          <Button asChild size={"icon"} variant={"secondary"}>
            <Link href="/dashboard">
              <Undo2 />
            </Link>
          </Button>
        )}

        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li
              key={item.href}
              className="flex items-center text-foreground dark:text-foreground"
            >
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
