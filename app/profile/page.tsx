"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editedUsername, setEditedUsername] = useState("");

  const supabase = createClient();

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  useEffect(() => {
    const handleSessionCheck = async () => {
      try {
        await checkSession();
        setEditedUsername(user?.user_metadata?.username || "");
      } catch (error) {
        console.error("Error checking session: ", error);
      }
    };
    handleSessionCheck();
  }, []);

  const handleSubmit = async () => {
    console.log(editedUsername);
    if (editedUsername.length < 3) {
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: editedUsername,
        },
      });
      if (error) throw error;
      setIsEditing(false);
      checkSession();
    } catch (error) {
      console.error("Error updating username: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      <form>
        <section className="flex flex-col gap-2">
          <span>Username</span>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <div className="flex gap-2">
                <Check onClick={handleSubmit} />
                <X onClick={() => setIsEditing(false)} />
              </div>
            </>
          ) : (
            <>
              <span>{user?.user_metadata.username}</span>
              <Pencil
                className="text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsEditing(true)}
              />
            </>
          )}

          <span>Email</span>
          <span>{user?.user_metadata.email}</span>
        </section>
      </form>
    </div>
  );
}
