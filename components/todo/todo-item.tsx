"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TodoActions } from "./todo-actions";

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const handleDelete = () => {
    onDelete(id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
        <Checkbox id={id} checked={is_complete} onCheckedChange={() => onToggle(id)} />
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
              "flex-1 cursor-pointer overflow-hidden text-ellipses",
              is_complete && "line-through text-muted-foreground"
            )}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task}
          </Label>
        )}
        <TodoActions onEdit={() => setIsEditing(true)} onDelete={() => setShowDeleteDialog(true)} />
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your todo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
