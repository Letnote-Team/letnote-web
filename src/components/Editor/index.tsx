import { EditorConfig } from "@editorjs/editorjs";
import { Caret } from "@editorjs/editorjs/types/api";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

let EditorJs: ComponentType<EditorConfig & {setCaret?: ((caret: Caret) => void)}>;
EditorJs = dynamic(() => import("./EditorJs"), { ssr: false }); //eslint-disable-line prefer-const

export const Editor = () => {
  return (
    <div className='w-full h-full space-y-2 p-6'>
      <EditorJs />
    </div>
  );
};

