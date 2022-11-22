import { useContext } from "react";
import { NoteContext, NoteProvider, NoteType } from "../contexts/NoteContext";

export const useNote = () => useContext(NoteContext);
