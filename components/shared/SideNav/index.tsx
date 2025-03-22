"use client";

import { cn } from "@/lib/utils";
import { useSideNav } from "./side-nav-context";
import { NavLink } from "./nav-link";
import SideNavFooter from "./side-nav-footer";
import SideNavHeader from "./side-nav-header";
import { getAccessibleNavigation } from "@/lib/static-data";

export default function SideNav() {
  const { isExpanded } = useSideNav();
  const navigation = getAccessibleNavigation();

  return (
    <div
      className={cn(
        "h-full hidden md:block transition-[width] duration-200 ease-in-out",
        isExpanded ? "md:w-[300px] lg:w-[300px]" : "md:w-[100px]"
      )}
    >
      <div className="h-full p-4">
        <nav className="h-full bg-background backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-xl flex flex-col overflow-hidden">
          <div
            className={cn(
              "p-3 border-b border-white/10 dark:border-white/5 relative",
              !isExpanded && "p-2"
            )}
          >
            <SideNavHeader />
          </div>

          <ul className="flex-1 p-2 space-y-1 overflow-y-auto">
            {navigation.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`}>
                {isExpanded && (
                  <li className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {section.title}
                  </li>
                )}

                {section.items.map((item, itemIndex) => (
                  <li key={`item-${sectionIndex}-${itemIndex}`}>
                    <NavLink
                      href={item.href}
                      name={item.name}
                      icon={item.icon}
                      exact={item.exact}
                    />
                  </li>
                ))}
              </div>
            ))}
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
      </div>
    </div>
  );
}
