import { ReactNode } from "react";
import { useTree } from "../../hooks/useTree";
import { Logo } from "../commons/Logo";
import { Tree } from "../Tree/Tree";
import { Button } from "../commons/Button";
import { Separator } from "../commons/Separator";
import { ScrollArea } from "../commons/ScrollArea";
import { NavItem } from "../NavBar/NavItem";
import {
  CardStackIcon,
  CheckCircledIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Link from "next/link";

const TreeLayout = ({ children }: { children?: ReactNode }) => {
  const { tree } = useTree();
  const { asPath } = useRouter();

  return (
    <div className="flex">
      <div
        className="w-64 2xl:w-80 fixed p-4 bg-neutral-50 h-screen top-0 bottom-0 overflow-hidden shadow-neutral-300 shadow-xl"
        aria-label="Sidebar"
      >
        <Logo />
        <div className="flex justify-between flex-col h-[calc(100%-36px)]">
          <nav>
            <div className="mt-4 space-y-1">
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
            <Separator className="my-2" />
            <div className="space-y-2">
              <h1 className="font-bold">ANOTAÇÕES</h1>
              <ScrollArea className="-ml-1 h-96">
                {tree && <Tree tree={tree} />}
              </ScrollArea>
            </div>
          </nav>
          <div className="flex gap-0.5">
            <Button className="flex-1 rounded-r-none">Criar</Button>
            <Button buttonType="primary" className="rounded-l-none !px-4">
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
