import { getTodos } from "@/lib/data/todos";
import { getUsers } from "@/lib/data/users";
import { ArrowLeft, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TodoCard } from "@/components/todo-card";

export default async function TodosPage() {
  const todos = await getTodos();
  const users = await getUsers();

  const userMap = new Map(users.map((user) => [user.id, user]));

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold text-foreground">All Todos</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Link href="/todos/completed" className="inline-flex items-center">
              <Button variant="outline" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                Completed Tasks
              </Button>
            </Link>
            <Link href="/" className="inline-flex items-center">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} user={userMap.get(todo.userId)} />
        ))}
      </div>
    </div>
  );
}
