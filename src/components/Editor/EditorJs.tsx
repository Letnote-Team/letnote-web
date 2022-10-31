import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJs, { EditorConfig } from "@editorjs/editorjs";
import { Caret } from "@editorjs/editorjs/types/api";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import { useEffect, useRef } from "react";
import { EditorTitle } from "./EditorTitle";

const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
const Editor = (props: EditorConfig & {setCaret?: (caret: Caret) => void}) => {
  const editorJs = useRef<EditorJs | null>(null);

  useEffect(() => {
    if (editorJs.current === null) {
      editorJs.current = new EditorJs({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Comece escrevendo suas anotações aqui!",
        ...props
      });
    }
  });

  return (
    <div>
      <div className="max-w-[660px] m-auto ">
        <EditorTitle editorJs={editorJs} />
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div id='editorjs'/>
    </div>
  );
};

export default Editor;