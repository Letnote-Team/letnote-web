import {
  CardStackIcon,
  CheckCircledIcon,
  ExitIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { ChangeEvent, ReactNode, useEffect } from "react";
import { NoteType } from "../../contexts/NoteContext";
import { useNote } from "../../hooks/useNote";
import { useTree } from "../../hooks/useTree";
import { Button } from "../commons/Button";
import { Logo } from "../commons/Logo";
import { ScrollArea } from "../commons/ScrollArea";
import { Separator } from "../commons/Separator";
import { NavItem } from "../NavBar/NavItem";
import { Tree } from "../Tree/Tree";

const TreeLayout = ({ children }: { children?: ReactNode }) => {
  const queryClient = useQueryClient();
  const { createNote } = useNote();
  const { tree, addNewTreeItem } = useTree();
  const { asPath, ...router } = useRouter();

  const handleUploadClick = () => {
    document.getElementById("upload-button")?.click();
  };

  useEffect(() => {}, []);

  const handleNoteUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];

    if (file) {
      console.log(reader?.readAsText(file));
    }

    reader.onloadend = (e) => {
      const note = JSON.parse(e.target?.result?.toString() ?? "") as NoteType;

      console.log(note);
      createNote(note.title, note.body);
      queryClient.refetchQueries(["notesTree"]);
    };
  };

  const handleAddNewNote = () => {
    addNewTreeItem();
    router.push("/notes/new-note", undefined, {
      shallow: true,
    });
  };

  return (
    <div className="flex">
      <div
        className="w-64 2xl:w-80 fixed p-4 bg-neutral-50 h-screen top-0 bottom-0 overflow-hidden shadow-neutral-300 shadow-xl"
        aria-label="Sidebar"
      >
        <div className="flex justify-between items-center">
          <Logo />
          <button
            onClick={() => {
              destroyCookie(null, "letnote.user", { path: "/" });
              router.push("/product");
            }}
            className="outline-none"
          >
            <ExitIcon color="red" className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between flex-col h-[calc(100%-36px)]">
          <nav className="mt-4">
            {/* <div className="mt-4 space-y-1">
              <NavItem
                title="Flashcards"
                isActivated={asPath === "/flashcards"}
                icon={<CardStackIcon className="w-5 h-5 text-neutral-800" />}
              />
              <NavItem
                title="Lista de tarefas"
                isActivated={asPath === "/todos"}
                icon={
                  <CheckCircledIcon
                    className={`w-5 h-5 ${
                      asPath === "/todos"
                        ? "text-primary-700"
                        : "text-neutral-800"
                    }`}
                  />
                }
              />
            </div>
            <Separator className="my-2" /> */}
            <div className="space-y-2">
              <h1 className="font-bold">ANOTAÇÕES</h1>
              <ScrollArea className="-ml-1 h-96">
                {tree && <Tree tree={tree} />}
              </ScrollArea>
            </div>
          </nav>
          <div className="flex gap-0.5">
            <Button
              onClick={handleAddNewNote}
              className="flex-1 rounded-r-none"
            >
              Criar
            </Button>
            <input
              id="upload-button"
              type="file"
              onChange={handleNoteUpload}
              hidden
            />
            <Button
              buttonType="primary"
              className="rounded-l-none !px-4"
              onClick={handleUploadClick}
            >
              <UploadIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
};

export default TreeLayout;
