"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderIcon, Menu, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useNote } from "@/context/NoteSelectContext";
import LogOutBtn from "./LogOutBtn";
import supabase from "@/supabase/client";
import { toast } from "sonner";
import DeleteModal from "./DeleteNote";

export function AppSidebar() {
  const { setSelectedNote, newNote } = useNote()
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const { notes, loading: newLoading, setNotes } = useUser()

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      if (error) throw error;
      setNotes(notes.filter((n) => n.id !== id));
      setSelectedNote(null);
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const sidebarContent = (
    <SidebarContent className="custom-scrollbar pb-2">
      <SidebarGroup>
        <SidebarGroupLabel className="mb-6 text-lg mt-8">
          {loading ? (
            "Loading your notes..."
          ) : user ? (
            "Your Notes"
          ) : (
            <p>
              <Link href="/login" className="underline">
                Login
              </Link>{" "}
              to see your notes
            </p>
          )}
        </SidebarGroupLabel>

        {loading && (
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <div className="h-6 w-full rounded bg-muted animate-pulse" />
              <div className="h-6 w-full rounded bg-muted animate-pulse" />
              <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
            </div>
          </SidebarGroupContent>
        )}

        {!loading && user && (
          <SidebarGroupContent>
            <Button
              onClick={() => {
                newNote();
                setOpen(false);
              }}
              className="w-full mb-4"
              variant="outline"
            >
              New Note +
            </Button>
            {newLoading ? (
              <LoaderIcon className="animate-spin mx-auto" />
            ) : (
              notes.map((n) => (
                <div
                  key={n.id}
                  className="group p-2 text-sm hover:bg-muted rounded cursor-pointer flex justify-between items-center"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest(".delete-btn")) return;
                    setSelectedNote({ id: n.id, title: n.title, text: n.note });
                    setOpen(false);
                  }}
                >
                  <div className="notes flex flex-col flex-1 min-w-0">
                    <p className="font-bold truncate">{n.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {n.created_at
                        ? new Date(n.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                        : "No date available"}
                    </p>
                  </div>
                  <DeleteModal onConfirm={() => handleDelete(n.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="delete-btn md:opacity-0 group-hover:opacity-100 md:group-hover:bg-destructive/10 transition-all"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </DeleteModal>
                </div>
              ))
            )}
          </SidebarGroupContent>
        )}
      </SidebarGroup>
    </SidebarContent>
  );

  return (
    <>
      {/* Mobile: Sheet Toggle Button */}
      <div className="md:hidden fixed top-7 right-2 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 h-screen overflow-y-auto custom-scrollbar">
            <div className="relative h-full">
              <Button
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 z-30"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
              <div className="h-full overflow-y-auto custom-scrollbar">{sidebarContent}</div>
              <div className="absolute bottom-6 right-8 z-40">
                <LogOutBtn isMobile={true} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen border-r">
        <Sidebar className="h-full flex flex-col">
          {sidebarContent}
        </Sidebar>
      </div>
    </>
  );
}