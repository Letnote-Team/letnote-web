import { mutateTree, TreeData } from "@atlaskit/tree";
import { OutputData } from "@editorjs/editorjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Tree } from "../components/Tree/Tree";
import { api } from "../services/api";
import { toastInterceptor } from "../utils/toastInterceptor";

export const NoteContext = createContext({} as NoteContextType);

export type NoteType = {
  id: number | "new-note";
  title: string;
  body: OutputData;
  parentId: number | null;
};

type UpdateNoteType = {
  id: number;
  parentId?: number | null;
  title?: string;
  body?: OutputData;
};

type NoteContextType = {
  notes: NoteType[] | undefined;
  getNoteById: (id: string) => NoteType;
  createNote: (
    title: string,
    body: OutputData,
    parentId?: number
  ) => Promise<NoteType>;
  updateNote: (data: UpdateNoteType) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setCurrentNote: Dispatch<SetStateAction<NoteType | undefined>>;
  syncCurrentNote: (id: number) => void;
  currentNote: NoteType | undefined;
};

export const noteFetch = async () => (await api.get("notes")).data.data;

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const {
    query: { id },
  } = useRouter();
  const [currentNote, setCurrentNote] = useState<NoteType | undefined>();
  const { data: notes } = useQuery<NoteType[]>(["notes"]);
  const queryClient = useQueryClient();

  const getNoteById = (id: string) => {
    return notes?.find((note) => note.id.toString() === id) ?? ({} as NoteType);
  };

  const createNote = async (
    title: string,
    body: OutputData,
    parentId?: number
  ) => {
    const request = await api.post("notes", { parentId, title, body });
    const data = request.data.data as NoteType;

    const newNotes = [...(notes ?? []), data];
    queryClient.setQueryData(["notes"], newNotes);

    return data;
  };

  const updateNote = async ({ id, ...updateData }: UpdateNoteType) => {
    if (
      JSON.stringify(getNoteById(id.toString()).body.blocks) !==
      JSON.stringify(updateData.body?.blocks)
    ) {
      const res = await api.put("notes/" + id, updateData);

      if (res.status >= 200 && res.status <= 400) {
        queryClient.refetchQueries(["notes"]);
      }
    }
  };

  const deleteNote = async (id: string) => {
    await api.delete("notes/" + id);
  };

  const syncCurrentNote = (id: number) => {
    setCurrentNote(getNoteById(id.toString()));
  };

  useEffect(() => {
    if (id && id !== "new-note") {
      syncCurrentNote(+id);
    }
  }, [id]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNoteById,
        createNote,
        updateNote,
        deleteNote,
        setCurrentNote,
        currentNote,
        syncCurrentNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
