"use client";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSideNav } from "../SideNav/side-nav-context";

export default function Header() {
  const { isExpanded, toggleSideNav, isMobileOpen, setMobileOpen } =
    useSideNav();
  return (
    <header className="border py-2 pl-2">
      <Button
        variant="ghost"
        onClick={toggleSideNav}
        className="hidden md:block dark:bg-foreground/15 dark:hover:bg-foreground/20"
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
    </header>
  );
}
