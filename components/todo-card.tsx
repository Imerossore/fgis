import { Todo } from "@/lib/data/todos";
import { User } from "@/lib/data/users";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  user?: User;
}

export function TodoCard({ todo, user }: TodoCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-white/20 bg-white/10 backdrop-blur-md dark:bg-black/20 dark:border-white/10 h-full">
      <CardHeader className="bg-white/20 dark:bg-white/5 pb-2 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-foreground line-clamp-2">
            {todo.title}
          </CardTitle>
          {todo.completed ? (
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Completed</span>
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center gap-1"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Pending</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        {user && (
          <p>
            Assigned to:{" "}
            <span className="font-semibold text-foreground">{user.name}</span>
          </p>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground border-t border-white/10 dark:border-white/5 pt-2 bg-white/5 dark:bg-white/5 py-3 flex justify-between backdrop-blur-sm">
        <div className="text-xs text-foreground/70">Todo ID: {todo.id}</div>
        <div className="text-xs text-foreground/70">User ID: {todo.userId}</div>
      </CardFooter>
    </Card>
  );
}
