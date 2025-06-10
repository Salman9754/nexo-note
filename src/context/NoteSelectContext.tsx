// context/NoteContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type SelectedNote = {
    id: number;
    title: string;
    text: string;
} | null;

type NoteContextType = {
    selectedNote: SelectedNote;
    setSelectedNote: (note: SelectedNote) => void;
    newNote: () => void;
};

const NoteContext = createContext<NoteContextType>({
    selectedNote: null,
    setSelectedNote: () => { },
    newNote: () => { },
});

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedNote, setSelectedNote] = useState<SelectedNote>(null);

    const newNote = () => {
        setSelectedNote(null); // sets up empty state
    };

    return (
        <NoteContext.Provider value={{ selectedNote, setSelectedNote, newNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export const useNote = () => useContext(NoteContext);
