import VerifiedUserComponent from "@/components/VerifiedUserComponent";
import PathDisplay from "@/components/path-display";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";
import { getUsers } from "@/lib/actions/users";
import { Suspense } from "react";
import UsermanagementLoading from "./loading";

export default function UserManagementPage() {
  return (
    <GlassMorphicCard className="rounded-lg p-4 flex flex-col gap-2 h-[85dvh]">
      <PathDisplay />
      <p className="text-white">
        Manage user accounts by assigning roles. Only verified users will be
        able to log in and utilize the FGIS monitoring system.
      </p>
      <Suspense fallback={<UsermanagementLoading />}>
        <div>{VerifiedUsers()}</div>
      </Suspense>
    </GlassMorphicCard>
  );
}

async function VerifiedUsers() {
  const verifiedUserData = await getUsers();
  return <VerifiedUserComponent users={verifiedUserData} />;
}
