import { Caret } from "@editorjs/editorjs/types/api";
import EditorJs from "@editorjs/editorjs";
import React, { HTMLAttributes, KeyboardEventHandler, LegacyRef, MutableRefObject, useEffect, useRef, useState } from "react";

export const EditorTitle = ({ editorJs } : { editorJs: MutableRefObject<EditorJs | null> }) => {
  return (
    <h1 className='
      text-4xl
      focus:outline-none
      font-bold
      whitespace-nowrap
      overflow-hidden
      py-2
      empty:before:content-[attr(data-placeholder)] empty:text-gray-text empty:font-semibold'
    contentEditable
    onKeyDown={(e) => { (e.key === "Enter") && editorJs.current?.caret.setToFirstBlock() && e.preventDefault(); }}
    data-placeholder='Digite seu título aqui...' />
  );
};