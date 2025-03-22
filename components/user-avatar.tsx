import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar>
      <AvatarImage
        src={
          user?.avatar_url ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstname} ${user?.lastname}`
        }
        alt={`${user?.firstname} ${user?.lastname}`}
      />
      <AvatarFallback>
        {user?.firstname && user?.lastname
          ? `${user.firstname[0]}${user.lastname[0]}`
          : ""}
      </AvatarFallback>
    </Avatar>
  );
}
