import { createContext, ReactNode, useState } from "react";

export const NoteContext = createContext({});

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState();

  return <NoteContext.Provider value={{}}>{children}</NoteContext.Provider>;
};
