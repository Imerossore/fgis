import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserAvatar({
  firstName,
  lastName,
  avatar_url,
}: {
  firstName: string;
  lastName: string;
  avatar_url: string;
}) {
  return (
    <Avatar>
      <AvatarImage
        src={
          avatar_url ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        }
        alt={`${firstName} ${lastName}`}
      />
      <AvatarFallback>
        {firstName && lastName ? `${firstName[0]}${lastName[0]}` : ""}
      </AvatarFallback>
    </Avatar>
  );
}
