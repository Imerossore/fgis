import ProfileForm from "@/components/forms/profile-form";
import PathDisplay from "@/components/path-display";
import { SubNav } from "@/components/sub-nav";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { getUser } from "@/lib/dal";
import { SubNavItem } from "@/lib/types";

export default async function SettingPage() {
  const user = await getUser();
  const subNavItems: SubNavItem[] = [
    {
      href: "/setting",
      label: "My Profile",
    },
    {
      href: "/setting/activity-logs",
      label: "Activity Logs",
    },
  ];

  return (
    <GlassMorphicCard className="rounded-lg p-4 flex flex-col gap-2 h-[85dvh]">
      <PathDisplay />
      <SubNav items={subNavItems} />
      <div className="flex flex-col h-full rounded-md overflow-hidden">
        <div className="bg-background px-2 py-3">
          <h1>Basic Information</h1>
        </div>
        <div className="flex-1 bg-card p-3">
          <ProfileForm user={user} />
        </div>
      </div>
    </GlassMorphicCard>
  );
}
