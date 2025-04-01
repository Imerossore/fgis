import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import UserAvatar from "@/components/user-avatar";
import UserMenu from "./user-menu";
import { UserType } from "@/lib/types";

export default function UserHeader({ user }: { user: UserType }) {
  return (
    <GlassMorphicCard className="flex items-center   px-2  py-1 rounded-l-x space-x-2.5 rounded-l-2xl border-r-0">
      <UserAvatar user={user} />
      <UserMenu user={user} />
    </GlassMorphicCard>
  );
}
