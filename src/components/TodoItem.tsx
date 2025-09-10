import { Todo, TodoPriority, TodoStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { CheckCircle2, Circle, MoreHorizontal, XCircle, ArrowRight, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}

const priorityMap: Record<TodoPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800" },
  high: { label: "High", className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800" },
};

const statusMap: Record<TodoStatus, { label: string; icon: React.ReactNode }> = {
    todo: { label: "To Do", icon: <Circle className="h-4 w-4 text-muted-foreground" /> },
    'in-progress': { label: "In Progress", icon: <ArrowRight className="h-4 w-4 text-blue-500" /> },
    done: { label: "Done", icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> },
    canceled: { label: "Canceled", icon: <XCircle className="h-4 w-4 text-red-500" /> },
};

export function TodoItem({ todo, onStatusChange, onDelete }: TodoItemProps) {
  const priority = priorityMap[todo.priority];
  const status = statusMap[todo.status];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg mb-1">{todo.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    {todo.id} &bull; Created {formatDistanceToNow(todo.createdAt, { addSuffix: true })}
                </CardDescription>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onStatusChange(todo.id, 'todo')}>To Do</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(todo.id, 'in-progress')}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(todo.id, 'done')}>Done</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(todo.id, 'canceled')}>Cancel</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 focus:bg-red-100 focus:text-red-600 dark:focus:bg-red-900/50 dark:focus:text-red-400" onClick={() => onDelete(todo.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {todo.description && <p className="text-sm text-muted-foreground">{todo.description}</p>}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            {status.icon}
            <span>{status.label}</span>
        </div>
        <div className="flex items-center gap-4">
            {todo.dueDate && (
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{format(todo.dueDate, "MMM d")}</span>
                </div>
            )}
            <Badge variant="outline" className={cn("font-semibold", priority.className)}>
                {priority.label}
            </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}