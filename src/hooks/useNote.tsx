import { OutputData } from "@editorjs/editorjs";
import { Saver } from "@editorjs/editorjs/types/api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { APP_CLIENT_INTERNALS } from "next/dist/shared/lib/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { idText } from "typescript";
import { api } from "../services/api";
import { DeepNullable } from "../utils/DeepNullable";

export type NoteType = {
  id: number | "new-note";
  title: string;
  body: OutputData;
};

type UpdateNoteType = {
  parentId?: number | null;
  title?: string;
  id: number;
  body?: OutputData;
};

type UpdateConfigType = {
  sync: boolean;
  syncDelayMs: number;
};

export const useNote = (initialData?: NoteType[]) => {
  const queryClient = useQueryClient();
  const { data: notes } = useQuery<NoteType[]>(
    ["notes"],
    async () => await (await api.get("notes")).data.data,
    { initialData }
  );

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

    return data;
  };

  const updateNote = async ({ id, ...updateData }: UpdateNoteType) => {
    if (getNoteById(id.toString()).body.blocks !== updateData.body?.blocks) {
      api.put("notes/" + id, updateData);
      queryClient.invalidateQueries(["notes"]);
    }
  };

  const deleteNote = (id: number) => {
    api.delete("notes/" + id);
  };

  return { notes, getNoteById, createNote, updateNote, deleteNote };
};
