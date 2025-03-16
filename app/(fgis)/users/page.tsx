import Link from "next/link";
import { User, getUsers } from "@/lib/data/users";
import { UserCard } from "@/components/user-card";
import { ArrowLeft } from "lucide-react";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">All Users</h2>
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
