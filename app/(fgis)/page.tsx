import { Users, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, getFeaturedUsers } from "@/lib/data/users";
import { UserCard } from "@/components/user-card";
import { getRecentTodos } from "@/lib/data/todos";
import { TodoCard } from "@/components/todo-card";

export default async function HomePage() {
  const users = await getFeaturedUsers(6);
  const todos = await getRecentTodos(8);

  const userMap = new Map(users.map((user) => [user.id, user]));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featured Users</h2>
        </div>
        <Link href="/users">
          <Button
            variant="secondary"
            className="bg-white/20 dark:bg-white/10 backdrop-blur-md hover:bg-white/30 text-foreground flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            View All Users
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 mt-12">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recent Todos</h2>
        </div>
        <Link href="/todos">
          <Button
            variant="outline"
            className="bg-white/10 dark:bg-white/5 backdrop-blur-md hover:bg-white/20 text-foreground flex items-center gap-2"
          >
            <CheckSquare className="h-4 w-4" />
            View All Todos
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} user={userMap.get(todo.userId)} />
        ))}
      </div>
    </div>
  );
}
