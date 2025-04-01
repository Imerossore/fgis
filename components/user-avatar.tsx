import { UserType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar({ user }: { user: UserType }) {
  return (
    <Avatar>
      <AvatarImage
        className="object-cover"
        src={
          user?.profile?.avatarUrl ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user?.profile?.firstName} ${user?.profile?.lastName}`
        }
        alt={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
      />
      <AvatarFallback>
        {user?.profile?.firstName && user?.profile?.lastName
          ? `${user.profile?.firstName[0]}${user.profile?.firstName[0]}`
          : ""}
      </AvatarFallback>
    </Avatar>
  );
}
