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
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
    const { selectedNote, newNote } = useNote();
    const { user, loading, setNotes, notes } = useUser()
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [Loading, setLoading] = useState(false)

    const handleSave = async () => {
        if (!user) return toast.error("User not found");

        try {
            setLoading(true);

            if (selectedNote && selectedNote.id) {
                // Update existing note
                const { error } = await supabase
                    .from("notes")
                    .update({
                        title,
                        note: text,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", selectedNote.id);

                if (error) throw error;
                setNotes(
                    notes.map((note) =>
                        note.id === selectedNote.id
                            ? { ...note, title, note: text, updated_at: new Date().toISOString() }
                            : note
                    )
                );
                toast.success("Note updated successfully");
            } else {
                // Insert new note
                const { data, error } = await supabase
                    .from("notes")
                    .insert({
                        user_id: user.id,
                        title,
                        note: text,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                    .select()
                    .single();

                if (error) throw error;

                // Add new note to notes array
                setNotes([{ id: data.id, title, note: text, user_id: user.id, created_at: data.created_at, updated_at: data.updated_at }, ...notes]);
                toast.success("New note created");
                newNote(); // Reset selectedNote to null
                setTitle(""); // Ensure form is cleared
                setText("");
            }
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error("Something went wrong");
        } finally {
            setLoading(false);
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

            {loading ? (
                <div className="flex flex-col h-full w-full p-6 space-y-4">
                    <Skeleton className="h-10 w-1/2 rounded-md" />
                    <Skeleton className="h-[300px] w-full rounded-md" />
                    <div className="flex justify-end gap-2">
                        <Skeleton className="h-10 w-20 rounded-md" />
                        <Skeleton className="h-10 w-24 rounded-md" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full w-full p-6 space-y-4">
                    <Input
                        name="title"
                        placeholder="Note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl sm:text-2xl md:text-3xl font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <Textarea
                        name="note"
                        placeholder="Start writing your note here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 text-base resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setTitle("");
                                setText("");
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            className="w-24"
                            onClick={handleSave}
                            disabled={Loading || title.trim() === "" || text.trim() === ""}
                        >
                            {Loading ? (
                                <LoaderIcon className="animate-spin" />
                            ) : selectedNote && selectedNote.id ? (
                                "Update"
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
