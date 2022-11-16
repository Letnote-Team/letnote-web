import { EditorConfig } from "@editorjs/editorjs";
import { Caret } from "@editorjs/editorjs/types/api";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { EditorProps } from "./EditorJs";

const EditorJs: ComponentType<EditorProps> = dynamic(
  () => import("./EditorJs"),
  { ssr: false }
);

export const Editor = (props: EditorProps) => {
  return (
    <div className="w-full h-full space-y-2 p-6">
      <EditorJs {...props} />
    </div>
  );
};
