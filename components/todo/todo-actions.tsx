"use client";

import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export function TodoActions({ onEdit, onDelete, className }: TodoActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={onEdit}
        className="text-primary hover:text-primary/80 transition-colors p-1"
        aria-label="Edit todo"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="text-destructive hover:text-destructive/80 transition-colors p-1"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
