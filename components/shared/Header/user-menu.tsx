"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { LogoutAlertDialog } from "./LogoutAlertDialog";
import { logoutAction } from "@/lib/actions/auth";
import { UserType } from "@/lib/types";

export default function UserMenu({ user }: { user: UserType }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const firstName = user?.profile?.firstName || "User";
  const lastName = user?.profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Guest";

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logoutAction();
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAlertOpen(true);
  };

  const handleAlertOpenChange = (open: boolean) => {
    setIsAlertOpen(open);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <ChevronDown
            size={16}
            className={cn(
              "text-background dark:text-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mr-2 backdrop-blur-md bg-background/90 border-white/20"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-white/10"
            onClick={() => router.push("/setting")}
          >
            <Settings className="w-4 h-4 mr-2 text-primary/70" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          className="cursor-pointer text-destructive hover:bg-destructive/10"
          onClick={handleLogoutClick}
          onSelect={(e) => e.preventDefault()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
        <LogoutAlertDialog
          isOpen={isAlertOpen}
          onOpenChange={handleAlertOpenChange}
          onConfirm={handleLogout}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
