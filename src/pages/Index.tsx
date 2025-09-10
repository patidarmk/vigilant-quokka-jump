import { useState } from "react";
import { initialTodos } from "@/data/todos";
import { Todo, TodoStatus } from "@/lib/types";
import { AddTodoDialog } from "@/components/AddTodoDialog";
import { TodoList } from "@/components/TodoList";
import { showSuccess } from "@/utils/toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter } from "lucide-react";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");

  const handleAddTodo = (newTodoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: `TASK-${Math.floor(Math.random() * 9000) + 1000}`,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    showSuccess("Task added successfully!");
  };

  const handleStatusChange = (id: string, status: TodoStatus) => {
    setTodos(todos.map(t => t.id === id ? { ...t, status } : t));
    showSuccess(`Task status updated`);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
    showSuccess("Task deleted.");
  };

  const filteredTodos = todos
    .filter(todo => 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(todo => 
      statusFilter === 'all' || todo.status === statusFilter
    );

  return (
    <div className="container max-w-screen-2xl py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and tasks with ease.</p>
        </div>
        <div className="flex items-center gap-2">
          <AddTodoDialog onAddTodo={handleAddTodo} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 border rounded-lg bg-card/80 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, description, or ID..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={(value: TodoStatus | "all") => setStatusFilter(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TodoList todos={filteredTodos} onStatusChange={handleStatusChange} onDelete={handleDelete} />
    </div>
  );
};

export default Index;