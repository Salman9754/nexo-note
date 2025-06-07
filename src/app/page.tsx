"use client"
import { toast } from "sonner"

export default function Page() {
  return (
    <>
      <button
        onClick={() => toast.success("Hello! This works.")}
        className="p-4 m-4 bg-green-500 text-white"
      >
        Show Toast
      </button>

    </>
  )
}
