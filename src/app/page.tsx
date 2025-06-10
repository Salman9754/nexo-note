"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/supabase/client";
import { useUser } from "@/context/UserContext";
import { toast } from 'sonner'
import { LoaderIcon } from "lucide-react";
import { useNote } from "@/context/NoteSelectContext";

export default function Page() {
  const { selectedNote } = useNote();
  const { user, getUser } = useUser()
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setloading] = useState(false)

  const handleSave = async () => {
    if (!user) return toast.error("User not found");

    try {
      setloading(true);

      if (selectedNote && selectedNote.id) {
        // Update existing note
        const { error } = await supabase
          .from("notes")
          .update({
            title,
            note: text,
            updated_at: new Date().toISOString(), // <-- manually set updated_at
          })
          .eq("id", selectedNote.id);

        if (error) throw error;

        toast.success("Note updated successfully");
      } else {
        // Insert new note
        const { error } = await supabase.from("notes").insert({
          user_id: user.id,
          title,
          note: text,
        });

        if (error) throw error;

        toast.success("New note created");
        getUser()
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setText(selectedNote.text);
    } else {
      setTitle("");
      setText("");
    }
  }, [selectedNote]);



  return (
    <>
      <div className="flex flex-col h-full w-full p-6 space-y-4">
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <Textarea
          placeholder="Start writing your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-base resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setTitle(""); setText(""); }}>
            Clear
          </Button>
          <Button className="w-24" onClick={handleSave} disabled={loading} >{loading ? <LoaderIcon className='animate-spin' /> : 'Save Note'}</Button>
        </div>
      </div>
    </>
  );
}
