"use client";

import { cn } from "@/lib/utils";
import { useSideNav } from "./side-nav-context";
import { NavLink } from "./nav-link";
import SideNavFooter from "./side-nav-footer";
import SideNavHeader from "./side-nav-header";
import { getAccessibleNavigation } from "@/lib/data/access_control";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserType } from "@/lib/types";

export default function SideNav({ user }: { user: UserType }) {
  const { isExpanded, isMobileOpen, setMobileOpen } = useSideNav();
  const navigation = getAccessibleNavigation({ user });

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 transition-all duration-300 ease-in-out",
          "w-[85%] max-w-[320px] md:static md:z-auto",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          isExpanded ? "md:w-[300px] lg:w-[300px]" : "md:w-[100px]"
        )}
      >
        <div className="h-full p-4">
          <nav className="h-full bg-background backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-xl flex flex-col overflow-hidden relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="absolute top-2 right-2 md:hidden z-10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>

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
                  {(isExpanded || isMobileOpen) && (
                    <li className="px-3 py-2 text-sm font-medium text-muted-foreground">
                      {section.title}
                    </li>
                  )}

                  {section.items.map((item, itemIndex) => (
                    <li
                      key={`item-${sectionIndex}-${itemIndex}`}
                      onClick={() => {
                        if (window.innerWidth < 768) setMobileOpen(false);
                      }}
                    >
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
    </>
  );
}
