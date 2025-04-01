"use client";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSideNav } from "../SideNav/side-nav-context";
import { ModeToggle } from "./mode-toggle";
import UserHeader from "./user-header";
import { UserType } from "@/lib/types";

export default function Header({ user }: { user: UserType }) {
  const { isExpanded, toggleSideNav, isMobileOpen, setMobileOpen } =
    useSideNav();

  return (
    <header className=" pt-4 pb-2  flex flex-row items-center justify-between z-10 sticky top-0  pl-2 md:pl-0">
      <div>
        <Button
          variant="ghost"
          onClick={toggleSideNav}
          className="hidden md:block bg-background dark:bg-foreground/25 hover:bg-accent cursor-pointer"
        >
          {isExpanded ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setMobileOpen(!isMobileOpen)}
          className="md:hidden text-background dark:text-foreground cursor-pointer"
        >
          <Menu size={24} />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserHeader user={user} />
      </div>
    </header>
  );
}
