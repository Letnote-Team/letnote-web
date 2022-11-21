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

export type EditorProps = EditorConfig & {
  title: string;
};

const Editor = ({ data, ...props }: EditorProps) => {
  const editorJs = useRef<EditorJs | null>(null);
  const router = useRouter();
  const id = router.query?.id;
  const { updateNote, getNoteById } = useNote();
  const [timeoutEvent, setTimeoutEvent] = useState<NodeJS.Timeout>();
  const loading = timeoutEvent !== undefined;

  const onChange = (api: API, event: CustomEvent<any>) => {
    // if (id === "new-note") return;
    // if (loading) return;
    // if (timeoutEvent) clearTimeout(timeoutEvent);
    // const timeout = setTimeout(async () => {
    //   updateNote({
    //     id: Number(id),
    //     body: await api.saver.save(),
    //   });
    //   setTimeoutEvent(undefined);
    // }, 5000);
    // setTimeoutEvent(timeout);
  };

  useEffect(() => {
    if (editorJs.current === null) {
      editorJs.current = new EditorJs({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Comece escrevendo suas anotações aqui!",
        onChange,
        readOnly: id === "new-note",
        data,
        autofocus: false,
        ...props,
      });
    }
  });

  useEffect(() => {
    if (data) {
      editorJs.current?.clear?.();

      if (data.blocks?.length > 0) {
        editorJs.current?.render?.(data);
      }
    }
  }, [data]);

  return (
    <div className="relative">
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
