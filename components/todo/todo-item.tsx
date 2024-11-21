"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  task: string;
  is_complete: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, task, is_complete, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md group">
      <Checkbox
        id={id}
        checked={is_complete}
        onCheckedChange={() => onToggle(id)}
      />
      <Label
        htmlFor={id}
        className={cn(
          "flex-1 cursor-pointer",
          is_complete && "line-through text-muted-foreground"
        )}
      >
        {task}
      </Label>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
      >
        Delete
      </button>
    </div>
  );
}
