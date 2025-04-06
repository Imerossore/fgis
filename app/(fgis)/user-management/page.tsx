import VerifiedUserComponent from "@/components/VerifiedUserComponent";
import PathDisplay from "@/components/path-display";
import { getUsers } from "@/lib/actions/users";

export default function UserManagementPage() {
  return (
    <div className="glassmorphic mr-3 p-3 flex flex-col gap-2 h-full mb-3">
      <PathDisplay />
      <p className="text-white">
        Manage user accounts by assigning roles. Only verified users will be
        able to log in and utilize the FGIS monitoring system.
      </p>
      <div>{VerifiedUsers()}</div>
    </div>
  );
}

async function VerifiedUsers() {
  const verifiedUserData = await getUsers();
  return <VerifiedUserComponent users={verifiedUserData} />;
}
