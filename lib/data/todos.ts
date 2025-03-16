import { unstable_cache } from "next/cache";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Base fetching function for all todos
async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

// Cache the fetching function using unstable_cache
export const getTodos = unstable_cache(async (): Promise<Todo[]> => {
  return await fetchTodos();
});

// Function to get todos for a specific user
export const getUserTodos = unstable_cache(
  async (userId: number): Promise<Todo[]> => {
    const allTodos = await getTodos();
    return allTodos.filter((todo) => todo.userId === userId);
  }
);

// Function to get limited number of todos
export const getRecentTodos = unstable_cache(
  async (count: number = 10): Promise<Todo[]> => {
    const allTodos = await getTodos();
    return allTodos.slice(0, count);
  }
);

// Function to get completed todos
export const getCompletedTodos = unstable_cache(async (): Promise<Todo[]> => {
  const allTodos = await getTodos();
  return allTodos.filter((todo) => todo.completed);
});

// Function to get incomplete todos
export const getIncompleteTodos = unstable_cache(async (): Promise<Todo[]> => {
  const allTodos = await getTodos();
  return allTodos.filter((todo) => !todo.completed);
});
