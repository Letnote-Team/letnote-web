import EditorJs, { API, EditorConfig, OutputData } from "@editorjs/editorjs";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  NoteBodyType,
  NoteType,
  UpdateNoteType,
} from "../../contexts/NoteContext";
import { useNote } from "../../hooks/useNote";
import { useToast } from "../../hooks/useToast";
import { Separator } from "../commons/Separator";
import { EditorDropdown } from "./EditorDropdown";
import { EditorTitle } from "./EditorTitle";
import { EDITOR_JS_TOOLS } from "./tools";

// @ts-ignore
import DragDrop from "editorjs-drag-drop";

export type EditorProps = EditorConfig & {
  title: string;
  data: NoteBodyType;
};

const Editor = ({ data, ...props }: EditorProps) => {
  const editorJs = useRef<EditorJs | null>(null);
  const router = useRouter();
  const [noteModel, setNoteModel] = useState<string>(
    data?.noteModel ?? "linear"
  );
  const [summary, setSummary] = useState<string>(data?.summary);
  const [tags, setTags] = useState<string[]>(data?.tags);
  const id = router.query?.id;
  const { currentNote, setCurrentNote, updateNote, syncCurrentNote } =
    useNote();
  const toast = useToast();

  const onChange = async (api: API, event: CustomEvent<any>) => {
    if (id === "new-note") return;

    const body = await getBody();

    setCurrentNote((prev) => {
      return {
        ...prev,
        body,
      } as NoteType;
    });
  };

  const getBody = async () => {
    const body = (await editorJs.current?.saver?.save?.()) as NoteBodyType;

    if (body) {
      body.tags = tags;
      body.summary = summary;
      body.noteModel = noteModel;

      return body;
    }

    return {} as NoteBodyType;
  };

  useEffect(() => {
    if (editorJs.current === null) {
      editorJs.current = new EditorJs({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Comece escrevendo suas anotações aqui!",
        onReady: () => {
          new DragDrop(editorJs.current);
        },
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
      className="relative flex flex-col max-h-[calc(100vh-2*1.6rem)]"
      onKeyDown={async (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === "s") {
          e.preventDefault();
          await updateNote({
            ...currentNote,
            body: await getBody(),
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
        <EditorDropdown
          handleOnChange={(prop) => {
            setNoteModel(prop);
            console.log(prop);
          }}
        />
      </div>
      <div className="max-w-[90%] m-auto w-full">
        <div>
          <EditorTitle title={props.title} editorJs={editorJs} />
        </div>
        <Separator />
      </div>
      <div
        className={
          noteModel === "cornell"
            ? "flex justify-center py-6 overflow-hidden flex-1"
            : ""
        }
      >
        <div
          className={
            noteModel === "cornell"
              ? "grid grid-cols-[1fr_80%] grid-rows-[fit-content fit-content] gap-x-4 gap-y-2 w-full max-w-[90%]"
              : ""
          }
        >
          {noteModel === "cornell" && (
            <div className="overflow-auto px-4 scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-neutral-200 flex flex-col rounded z-0 border border-neutral-300 p-4">
              <ul className="space-y-1">
                {tags?.map((tag) => (
                  <li key={tag}>• {tag}</li>
                ))}
                <li
                  contentEditable={true}
                  data-placeholder="Adicione aqui"
                  onKeyDown={(e) => {
                    const text = (e.target as HTMLElement).innerText;

                    if (e.key.toLowerCase() === "enter") {
                      if (text.trim() !== "") {
                        (e.target as HTMLElement).innerText = "";

                        setTags([...(tags ?? []), text]);
                      }
                      e.preventDefault();
                    }

                    if (!tags) return;

                    if (
                      e.key.toLowerCase() === "backspace" &&
                      text === "" &&
                      tags.length > 0
                    ) {
                      const lastTag = tags[tags.length - 1];

                      setTags(tags.filter((tag) => tag !== lastTag));

                      (e.target as HTMLElement).innerText = lastTag;

                      e.preventDefault();
                    }
                  }}
                  className={`w-full
                          outline-none
                          empty:before:cursor-text
                          empty:before:content-[attr(data-placeholder)] empty:text-gray-text`}
                ></li>
              </ul>
            </div>
          )}
          <div
            id="editorjs"
            className="px-4 overflow-x-visible overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-neutral-200"
          />
          {noteModel === "cornell" && (
            <textarea
              placeholder="Escreva seu sumário aqui"
              className=" resize-none border-neutral-300 w-full focus:border-none focus:ring-primary focus:ring-2 rounded col-span-2 h-20"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
