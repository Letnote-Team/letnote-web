import Embed from "@editorjs/embed";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Raw from "@editorjs/raw";
// @ts-ignore
import SimpleImage from "simple-image-editorjs";
import Table from "@editorjs/table";
// @ts-ignore
import CodeFlask from "@calumk/editorjs-codeflask";
import NestedList from "@editorjs/nested-list";
// @ts-ignore
import ToggleBlock from "editorjs-toggle-block";
// @ts-ignore
import MermaidTool from "editorjs-mermaid";
// @ts-ignore
import NestedCheckList from "@calumk/editorjs-nested-checklist";
// @ts-ignore
import AlignmentTool from "editorjs-text-alignment-blocktune";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: {
    class: NestedList,
    inlineToolbar: true,
  },
  raw: Raw,
  toggle: {
    class: ToggleBlock,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    }
  },
  mermaid: MermaidTool,
  checklist: {
    class: NestedCheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  code: CodeFlask,
  alignment: {
    class: AlignmentTool,
    config:{
      default: "left",
    },
  }
};