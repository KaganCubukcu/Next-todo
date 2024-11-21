"use client";

import { useState } from "react";

interface TodoInputProps {
  onAdd: (task: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task.trim());
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 border rounded-md bg-background"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Add
      </button>
    </form>
  );
}
