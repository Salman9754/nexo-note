"use client"
import { toast } from "sonner"
import AskAiBtn from "@/components/AskAiBtn"
import { useUser } from "@/context/UserContext"
export default function Page() {
  const { user } = useUser()
  return (
    <>
      <div className="flex h-full flex-col items-center gap-4">
        <div className="flex w-full max-w-4xl justify-end gap-2">
          <AskAiBtn />
          {/* {<NewNoteButton user={user} /> */}
        </div>

        {/* <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />

        <HomeToast /> */}
      </div>
    </>
  )
}
