"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

interface TodoItemProps {
  id: string;
  task: string;
  is_complete: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, task: string) => void;
}

export function TodoItem({ id, task, is_complete, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTask.trim() !== "") {
      onUpdate(id, editedTask);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTask(task);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md group">
      <Checkbox
        id={id}
        checked={is_complete}
        onCheckedChange={() => onToggle(id)}
      />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary rounded px-1"
          />
        </form>
      ) : (
        <Label
          htmlFor={id}
          className={cn(
            "flex-1 cursor-pointer",
            is_complete && "line-through text-muted-foreground"
          )}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task}
        </Label>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-destructive hover:text-destructive/80 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
