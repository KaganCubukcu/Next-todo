"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { User } from "@supabase/supabase-js";
import { ThemeSwitcher } from "../theme-switcher";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const pathname = usePathname();

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  // Check session on route changes
  useEffect(() => {
    checkSession();
  }, [pathname]);

  useEffect(() => {
    // Initial session check
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Add focus event listener
    const handleFocus = () => {
      checkSession();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="border-b">
      <div className="h-16 container flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-bold text-xl">
          Focus Flow
        </Link>

        {/* Theme and Auth Section */}
        <div className="flex items-center">
        <ThemeSwitcher />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-muted-foreground">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
