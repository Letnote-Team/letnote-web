import EditorJs, { API, EditorConfig } from "@editorjs/editorjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useNote } from "../../hooks/useNote";
import { Button } from "../commons/Button";
import { EditorDropdown } from "./EditorDropdown";
import { Separator } from "../commons/Separator";
import { EditorTitle } from "./EditorTitle";
import { EDITOR_JS_TOOLS } from "./tools";
import { NoteType } from "../../contexts/NoteContext";
import { useToast } from "../../hooks/useToast";

export type EditorProps = EditorConfig & {
  title: string;
};

const Editor = ({ data, ...props }: EditorProps) => {
  const editorJs = useRef<EditorJs | null>(null);
  const router = useRouter();
  const id = router.query?.id;
  const { currentNote, setCurrentNote, updateNote, syncCurrentNote } =
    useNote();
  const toast = useToast();

  const onChange = async (api: API, event: CustomEvent<any>) => {
    if (id === "new-note") return;

    const body = await api.saver.save();

    setCurrentNote((prev) => {
      return {
        ...prev,
        body,
      } as NoteType;
    });
  };

  useEffect(() => {
    if (editorJs.current === null) {
      editorJs.current = new EditorJs({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Comece escrevendo suas anotações aqui!",
        onChange,
        data,
        autofocus: false,
        ...props,
      });
    }
  });

  useEffect(() => {
    if (data) {
      if (data.blocks?.length > 0) {
        editorJs.current?.render?.(data);
        return;
      }
    }

    editorJs.current?.clear?.();
  }, [data]);

  return (
    <div
      className="relative"
      onKeyDown={async (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === "s") {
          e.preventDefault();
          await updateNote({
            ...currentNote,
            body: await editorJs.current?.save(),
            id: +router.query.id!,
          });
          toast.show({
            title: "Salvo com sucesso",
            desc: "isso aí com sucesso",
            type: "success",
          });
        }
      }}
    >
      <div className="absolute top-0 right-0 -m-4">
        <EditorDropdown />
      </div>
      <div className="max-w-[90%] m-auto ">
        <div>
          <EditorTitle title={props.title} editorJs={editorJs} />
        </div>
        <Separator />
      </div>
      <div id="editorjs" />
    </div>
  );
};

export default Editor;
