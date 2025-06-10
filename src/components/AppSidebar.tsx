"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useNote } from "@/context/NoteSelectContext";
import LogOutBtn from "./LogOutBtn";



export function AppSidebar() {
  const { setSelectedNote, newNote } = useNote()
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const { notes, loading: newLoading } = useUser()

  const sidebarContent = (
    <SidebarContent className="custom-scrollbar">
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
                newNote()
                setOpen(false)

              }}
              className="w-full mb-4"
              variant="outline"
            >
              New Note  +
            </Button>
            {newLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              notes.map((n, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setOpen(false)
                    setSelectedNote({ id: n.id, title: n.title, text: n.note })
                  }}
                  className="p-2 text-sm hover:bg-muted rounded cursor-pointer"
                >
                  {n.title}
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
      <div className="md:hidden fixed top-7 right-2 z-50" >
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 " >
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-30 "
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
            {sidebarContent}
            <LogOutBtn/>
          </SheetContent>
          
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 h-screen border-r">
        <Sidebar>{sidebarContent}</Sidebar>
      </div>
    </>
  );
}
