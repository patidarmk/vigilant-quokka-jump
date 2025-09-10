import { Todo, TodoStatus } from "@/lib/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onStatusChange: (id: string, status: TodoStatus) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onStatusChange, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground bg-card/50 rounded-lg border border-dashed">
        <p className="text-lg font-medium">No tasks found!</p>
        <p>Try adjusting your filters or add a new task.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
}