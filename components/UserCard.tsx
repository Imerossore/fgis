"use client";

import { useState } from "react";
import SelectRoleDivisionDialog from "./SelectRoleDivisionDialog";
import { UserRole, UserType } from "@/lib/types";
import UserAvatar from "./user-avatar";
import { Badge } from "./ui/badge";

export default function UserCard({ user }: { user: UserType }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-card shadow-lg rounded-2xl p-6 flex items-center gap-5 relative hover:scale-[1.02] duration-300 group border "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <SelectRoleDivisionDialog user={user} />}
      <UserAvatar user={user} className="h-20 w-20" />
      <div className="flex flex-col justify-center">
        <h1 className="text-md font-semibold">{`${user.profile?.firstName} ${user.profile?.lastName}`}</h1>
        <p className="text-xs text-muted-foreground mb-2">{user.idNumber}</p>
        <Badge
          variant={
            user.role === UserRole.Administrator
              ? "default"
              : user.role === UserRole.Editor || user.role === UserRole.Viewer
              ? "secondary"
              : "outline"
          }
        >
          {user.role || "Assign Role"}
        </Badge>
      </div>
    </div>
  );
}
