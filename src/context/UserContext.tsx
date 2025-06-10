"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/supabase/client";

type UserContextType = {
  user: User | null;
  notes: Note[]
  loading: boolean;
  getUser: () => void;
};

type Note = {
  id: number;
  title: string;
  note: string;
  user_id: string;
  created_at?: string;
  updated_at?: string
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  notes: [],
  getUser: () => { },
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) console.error("getUser error:", error);
    setUser(data.user ?? null);
    try {
      const { data: NotesData, error: NotesError } = await supabase
        .from('notes')
        .select()
        .eq('user_id', data?.user?.id);
      if (NotesError) throw NotesError
      if (NotesData) {
        console.log(NotesData)
        setNotes(NotesData)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log("Something went wrong")
      }

    }
    setLoading(false);
  };


  useEffect(() => {

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, getUser, notes }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
