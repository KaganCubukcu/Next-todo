"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

// Base Components
export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal

// Overlay Component
interface OverlayProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  className?: string
}

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  OverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
AlertDialogOverlay.displayName = "AlertDialogOverlay"

// Content Component
interface ContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  className?: string
}

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  ContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        // Position and layout
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg",
        "translate-x-[-50%] translate-y-[-50%]",
        // Styling
        "gap-4 border bg-background p-6 shadow-lg",
        "sm:rounded-lg",
        // Animations
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = "AlertDialogContent"

// Layout Components
interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const AlertDialogHeader = ({ className, ...props }: LayoutProps) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

export const AlertDialogFooter = ({ className, ...props }: LayoutProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

// Text Components
interface TextProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
  className?: string
}

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  TextProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  TextProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

// Action Components
interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
)
AlertDialogAction.displayName = "AlertDialogAction"

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = "AlertDialogCancel"
