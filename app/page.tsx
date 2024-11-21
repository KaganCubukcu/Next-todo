"use client";

import { TodoList } from "@/components/todo";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Welcome to Next Todo</h1>
        <p className="text-xl text-muted-foreground">
          The simple, efficient way to manage your tasks. Sign in to create and manage your personal todo list.
        </p>
        <div className="grid gap-4">
          <p className="text-muted-foreground">
            ✓ Create and manage tasks
          </p>
          <p className="text-muted-foreground">
            ✓ Track your progress
          </p>
          <p className="text-muted-foreground">
            ✓ Stay organized
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full">
      <TodoList />
    </main>
  );
}
