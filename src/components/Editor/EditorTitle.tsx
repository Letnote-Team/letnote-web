import EditorJs from "@editorjs/editorjs";
import { MutableRefObject } from "react";

export const EditorTitle = ({ editorJs } : { editorJs: MutableRefObject<EditorJs | null> }) => {
  return (
    <h1 className='
      text-3xl
      focus:outline-none
      font-bold text-[#333]
      whitespace-nowrap
      overflow-hidden
      py-2
      empty:before:cursor-text
      empty:before:content-[attr(data-placeholder)] empty:text-gray-text empty:font-semibold'
    contentEditable
    onKeyDown={(e) => { (e.key === "Enter") && editorJs.current?.caret.setToFirstBlock() && e.preventDefault(); }}
    data-placeholder='Digite seu título aqui...' />
  );
};