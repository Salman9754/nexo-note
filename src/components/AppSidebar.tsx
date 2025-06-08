"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useUser } from "@/context/UserContext"

export function AppSidebar() {
    const { user, loading } = useUser()

    type Note = {
        note: string
    }

    const notes: Note[] = [
        {
            note: "Hello this is note",
        },
    ]

    return (
<Sidebar>
  <SidebarContent className="custom-scrollbar">
    <SidebarGroup>
      <SidebarGroupLabel className="mb-2 text-lg mt-8">
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
          {notes.map((n, i) => (
            <div key={i} className="p-2 text-sm hover:bg-muted rounded">
              {n.note}
            </div>
          ))}
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

    )
}
