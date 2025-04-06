"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import toast from "react-hot-toast";
import { Edit } from "lucide-react";
import { UserType } from "@/lib/types";
import UserAvatar from "./user-avatar";
import { setUserRoleDivision } from "@/lib/actions/users";

interface SelectRoleDivisionDialog {
  user: UserType;
}

const divisions = [
  { value: "division-1", label: "Division 1" },
  { value: "division-2", label: "Division 2" },
  { value: "division-3", label: "Division 3" },
  { value: "division-4", label: "Division 4" },
  { value: "division-5", label: "Division 5" },
  { value: "division-6", label: "Division 6" },
  { value: "drd", label: "DRD" },
] as const;

export default function SelectRoleDivisionDialog({
  user,
}: SelectRoleDivisionDialog) {
  const [selectedRole, setSelectedRole] = useState<string>(user.role || "");
  const [selectedDivision, setSelectedDivision] = useState<string>(
    user.profile?.division || ""
  );

  const [state, action, isPending] = useActionState(setUserRoleDivision, {
    success: false,
    message: "",
  });

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrator":
        return "default";
      case "editor":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  useEffect(() => {
    if (!isPending && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: "select-toast",
      });
    }
  }, [isPending, state.success, state.message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <input type="hidden" name="id" value={user.id} />
          <input type="hidden" name="role" value={selectedRole} />
          <input type="hidden" name="division" value={selectedDivision} />

          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl">
              Role & Division Management
            </DialogTitle>
            <DialogDescription />

            <div className="flex items-start space-x-4 pb-2 border-b">
              <UserAvatar user={user} />

              <div>
                <div className="font-medium text-lg">
                  {user.profile?.firstName} {user.profile?.lastName}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{user.idNumber}</span>
                  {user.role && (
                    <Badge
                      variant={getRoleBadgeVariant(user.role)}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Assignment</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole === "editor" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Division Assignment
                </label>
                <Select
                  value={selectedDivision}
                  onValueChange={setSelectedDivision}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division.value} value={division.value}>
                        {division.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
