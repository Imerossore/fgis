"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-pink-200 p-2 border-b sticky top-0 flex justify-end md:justify-between items-center">
      <Button
        onClick={toggleSidebar}
        variant={"outline"}
        className="bg-white/50 hidden md:block "
      >
        <PanelLeft size={40} />
      </Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
