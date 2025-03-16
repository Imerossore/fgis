"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, CheckSquare, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import NiaLogo from "./nia-logo";

interface SideNavProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
  collapsed?: boolean;
}

export default function SideNav({
  className,
  onClose,
  isMobile,
  collapsed = false,
}: SideNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/users", label: "Users", icon: Users },
    { href: "/todos", label: "Todos", icon: CheckSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className={cn("h-full", className)}>
      <nav className="h-full bg-background backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-xl flex flex-col overflow-hidden">
        <div
          className={cn(
            "p-4 border-b border-white/10 dark:border-white/5 relative",
            collapsed && !isMobile && "p-2"
          )}
        >
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          )}

          <div className="flex justify-center items-center gap-2">
            {collapsed && !isMobile ? (
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
        </div>

        <ul className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            const NavLink = () => (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-white/20 dark:hover:bg-white/10",
                  "group relative overflow-hidden",
                  collapsed && !isMobile && "justify-center px-2",
                  isActive
                    ? "bg-white/30 dark:bg-white/15 text-foreground font-medium"
                    : "text-foreground/70"
                )}
                onClick={isMobile && onClose ? onClose : undefined}
              >
                {isActive && (
                  <div
                    className={cn(
                      "absolute left-0 top-1/4 h-1/2 w-1 bg-primary rounded-r-full",
                      collapsed &&
                        !isMobile &&
                        "left-1/4 top-0 h-1 w-1/2 rounded-b-full rounded-t-none"
                    )}
                  />
                )}

                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-primary"
                      : "text-primary/70 group-hover:text-primary"
                  )}
                />

                {(!collapsed || isMobile) && <span>{item.label}</span>}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10" />
                )}
              </Link>
            );

            return (
              <li key={item.href}>
                {collapsed && !isMobile ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <NavLink />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <NavLink />
                )}
              </li>
            );
          })}
        </ul>

        <div
          className={cn(
            "p-4 border-t border-white/10 dark:border-white/5 text-center",
            collapsed && !isMobile && "p-2"
          )}
        >
          <div className="text-xs text-muted-foreground">
            {collapsed && !isMobile ? (
              <span>&copy; {new Date().getFullYear()}</span>
            ) : (
              <span>&copy; {new Date().getFullYear()} FGIS</span>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
