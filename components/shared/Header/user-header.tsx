import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import UserAvatar from "@/components/user-avatar";
import { getCurrentUser } from "@/lib/static-data";
import UserMenu from "./user-menu";

export default function UserHeader() {
  const user = getCurrentUser();
  return (
    <GlassMorphicCard className="flex items-center   px-2  py-1 rounded-l-x space-x-2.5 rounded-l-2xl border-r-0">
      <UserAvatar user={user} />
      <UserMenu user={user} />
    </GlassMorphicCard>
  );
}
