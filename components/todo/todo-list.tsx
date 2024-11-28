"use client";

import { useEffect, useState } from "react";
import { TodoItem } from "./todo-item";
import { TodoInput } from "./todo-input";
import { createClient } from "@/utils/supabase/client";
import { useTodoOperations } from "@/hooks/useTodoOperations";
import { Loading } from "../ui/loading";

interface Todo {
  id: string;
  user_id?: string;
  task: string;
  is_complete: boolean;
  created_at: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const { addTodo: addTodoWithToast, updateTodo: updateTodoWithToast, deleteTodo: deleteTodoWithToast } = useTodoOperations();
  
  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchTodos();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      let query = supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      // If user is logged in, only fetch their todos
      if (session?.user) {
        query = query.eq('user_id', session.user.id);
      } else {
        // If not logged in, only fetch todos without user_id (dummy todos)
        query = query.is('user_id', null);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (task: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Must be logged in to add todos');
      }

      const data = await addTodoWithToast(task, session.user.id);
      if (data) {
        setTodos([data, ...todos]);
      }
    } catch (error: any) {
      console.error('Error adding todo:', error.message);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await updateTodoWithToast(Number(id), { is_complete: !todo.is_complete });
      setTodos(todos.map(t => 
        t.id === id ? { ...t, is_complete: !t.is_complete } : t
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const updateTodo = async (id: string, task: string) => {
    try {
      await updateTodoWithToast(Number(id), { task });
      setTodos(todos.map(t => 
        t.id === id ? { ...t, task } : t
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoWithToast(Number(id));
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return (
    <div>
      <Loading />
    </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {user ? (
        <TodoInput onAdd={addTodo} />
      ) : (
        <p className="text-center mb-4 text-muted-foreground">
          Sign in to create your own todos
        </p>
      )}
      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            task={todo.task}
            is_complete={todo.is_complete}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}
