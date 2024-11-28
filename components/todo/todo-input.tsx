"use client";

import { useState } from "react";

interface TodoInputProps {
  onAdd: (task: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [task, setTask] = useState("");
  const maxTextLength = 50;
  const minTextLength = 4;

  const isValidTask = task.trim() && task.length >= minTextLength && task.length <= maxTextLength;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidTask) {
      onAdd(task.trim());
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border rounded-md bg-background"
          maxLength={maxTextLength}
        />
        <button
          type="submit"
          className={`px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90" ${!isValidTask ? "opacity-50 cursor-not-allowed" : ""} `}
          disabled={!isValidTask}
        >
          Add
        </button>
      </div>
      <div
        className={`text-xs text-muted-foreground mt-1 ml-1 ${task.length > maxTextLength ? "text-red-500" : ""}`}
      >
        {task.length} / {maxTextLength}
      </div>
    </form>
  );
}
