import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import UserAvatar from "@/components/user-avatar";

export default function UserHeader() {
  return (
    <GlassMorphicCard className="flex items-center w-16  p-1 rounded-l-xl">
      <UserAvatar firstName="John" lastName="Doe" avatar_url="" />
    </GlassMorphicCard>
  );
}
