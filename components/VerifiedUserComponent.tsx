import { UserType } from "@/lib/types";
import UserCard from "./UserCard";

export default function VerifiedUserComponent({
  users,
}: {
  users: UserType[];
}) {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 gap-3  pt-2">
      {users.length === 0 && <p>No users found</p>}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
