"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <div className="ff-loader first-f" />
      <div className="ff-loader second-f" />
    </div>
  );
}
