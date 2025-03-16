"use client";

import { cn } from "@/lib/utils";
import { useSideNav } from "./side-nav-context";
import { NavLink } from "./nav-link";
import {
  ChartPie,
  FileChartColumn,
  Home,
  Settings,
  Users2,
} from "lucide-react";
import SideNavFooter from "./side-nav-footer";
import SideNavHeader from "./side-nav-header";

export default function SideNav({ userRole }: { userRole: string }) {
  const { isExpanded } = useSideNav();

  if (userRole) {
    console.log(userRole);
  }

  return (
    <aside
      className={cn(
        "h-full hidden md:block p-4 transition-[width] duration-200 ease-in-out",
        isExpanded ? "md:w-[300px] lg:w-[300px]" : "md:w-[100px]"
      )}
    >
      <nav className="h-full bg-background backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-xl flex flex-col overflow-hidden">
        <div
          className={cn(
            "p-3 border-b border-white/10 dark:border-white/5 relative",
            !isExpanded && "p-2"
          )}
        >
          <SideNavHeader />
        </div>

        <ul className="flex-1 p-2 space-y-1">
          {isExpanded && (
            <li className="px-3 py-2 text-sm font-medium text-muted-foreground">
              Main Menu
            </li>
          )}

          <li>
            <NavLink href="/" name="Home" icon={<Home />} exact />
          </li>

          <li>
            <NavLink href="/charts" name="Charts" icon={<ChartPie />} />
          </li>

          <li>
            <NavLink
              href="/test"
              name="Accomplishments"
              icon={<FileChartColumn />}
            />
          </li>

          <li>
            <NavLink
              href="/user-management"
              name="User Management"
              icon={<Users2 />}
            />
          </li>

          {isExpanded && (
            <li className="px-3 py-2 mt-3 text-sm font-medium text-muted-foreground">
              Other Menu
            </li>
          )}

          <li>
            <NavLink
              href="/reports"
              name="Reports"
              icon={<FileChartColumn />}
            />
          </li>

          <li>
            <NavLink href="/setting" name="Setting" icon={<Settings />} />
          </li>
        </ul>

        <div
          className={cn(
            "p-4 border-t border-white/10 dark:border-white/5 text-center",
            !isExpanded && "p-2"
          )}
        >
          <SideNavFooter />
        </div>
      </nav>
    </aside>
  );
}
