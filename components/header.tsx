"use client";

import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar?: () => void;
  toggleCollapsed?: () => void;
  isCollapsed?: boolean;
}

export default function Header({
  toggleSidebar,
  toggleCollapsed,
  isCollapsed,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`border-b py-2 flex items-center sticky top-0 z-10 transition-all duration-200 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : ""
      }`}
    >
      {/* Mobile menu button - only visible on smaller screens */}
      {toggleSidebar && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Desktop/Tablet sidebar collapse toggle - hidden on mobile */}
      {toggleCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleCollapsed}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
          <span className="sr-only">
            {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </Button>
      )}

      <div className="flex-1"></div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <div className="bg-primary px-2 py-1 rounded-tl-lg rounded-bl-lg w-14 flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
