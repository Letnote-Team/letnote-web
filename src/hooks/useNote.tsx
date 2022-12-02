import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";

export const useNote = () => useContext(NoteContext);
