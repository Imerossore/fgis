"use client";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSideNav } from "../SideNav/side-nav-context";
import { ModeToggle } from "./mode-toggle";
import UserHeader from "./user-header";

export default function Header() {
  const { isExpanded, toggleSideNav, isMobileOpen, setMobileOpen } =
    useSideNav();
  return (
    <header className=" py-2  flex flex-row items-center justify-between z-10 sticky top-0 bg-primary dark:bg-background">
      <div>
        <Button
          variant="ghost"
          onClick={toggleSideNav}
          className="hidden md:block  bg-foreground/20 hover:bg-foreground/30 "
        >
          {isExpanded ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setMobileOpen(!isMobileOpen)}
          className="md:hidden"
        >
          <Menu />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserHeader />
      </div>
    </header>
  );
}
