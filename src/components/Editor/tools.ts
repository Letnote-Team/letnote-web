import Embed from "@editorjs/embed";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "simple-image-editorjs";
import Table from "@editorjs/table";
import CodeFlask from "@calumk/editorjs-codeflask";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  raw: Raw,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    }
  },
  quote: Quote,
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  code: CodeFlask,
};