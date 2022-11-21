import { ItemId, mutateTree } from "@atlaskit/tree";
import EditorJs, { OutputData } from "@editorjs/editorjs";
import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, MutableRefObject } from "react";
import { useNote } from "../../hooks/useNote";
import { useTree } from "../../hooks/useTree";

type EditorTitleProps = {
  editorJs: MutableRefObject<EditorJs | null>;
  title: string;
};

export const EditorTitle = ({ editorJs, title }: EditorTitleProps) => {
  const { tree, updateTree } = useTree();
  const { createNote, updateNote } = useNote();
  const router = useRouter();
  const id = router.query?.id as string | number;

  const handleKeyDown = async (e: KeyboardEvent<HTMLHeadingElement>) => {
    const text = (e.target as HTMLElement).innerText;
    const isKeyEnter = e.key === "Enter";
    const isMaxText = text.length >= 20;
    const isKeyBackspace = e.key === "Backspace";

    if (isMaxText && !isKeyBackspace) {
      e.preventDefault();
    }

    if (isKeyEnter) {
      e.preventDefault();

      if (id === "new-note") {
        const data = (await editorJs.current?.save()) as OutputData;
        createNote(text, data, tree!.items["new-note"].data.parentId!).then(
          (note) =>
            router.push("/notes/" + note.id, undefined, { shallow: true })
        );
      }

      editorJs.current?.caret.setToFirstBlock();
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLHeadingElement>) => {
    const text = (e.target as HTMLElement).innerText;

    if (id && tree)
      updateTree(
        mutateTree(tree, id as ItemId, {
          data: {
            ...tree.items[id]?.data,
            title: text === "" ? "Sem Título" : text,
          },
        })
      );

    if (id !== "new-note") {
      updateNote({ id: Number(id), title: text });
    }
  };

  return (
    <h1
      className="
      text-3xl
      focus:outline-none
      font-bold text-[#333]
      whitespace-nowrap
      overflow-hidden
      py-2
      empty:before:cursor-text
      empty:before:content-[attr(data-placeholder)] empty:text-gray-text empty:font-semibold"
      contentEditable
      // onKeyDown={handleKeyDown}
      // onKeyUp={handleKeyUp}
      data-placeholder="Digite seu título aqui..."
    >
      {title}
    </h1>
  );
};
