import { ReactNode } from "react";
import { useTree } from "../../hooks/useTree";
import { Logo } from "../commons/Logo";
import { Tree } from "../Tree/Tree";
import { Button } from "../commons/Button";
import Link from "next/link";
import { Separator } from "../commons/Separator";
import { ScrollArea } from "../commons/ScrollArea";
import { NavLinkItem } from "../NavBar/NavLinkItem";
import { CardStackIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const TreeLayout = ({ children }: { children?: ReactNode }) => {
  const { tree } = useTree();
  const { asPath } = useRouter();

  return (
    <div className="flex">
      <div
        className="w-64 2xl:w-80 p-4 bg-neutral-50 h-screen fixed top-0 bottom-0 overflow-hidden shadow-neutral-300 shadow-xl"
        aria-label="Sidebar"
      >
        <Logo />
        <div className="flex justify-between flex-col h-[calc(100%-36px)]">
          <nav>
            <div className="mt-4 space-y-1">
              <NavLinkItem
                title="Flashcards"
                href="/flashcards"
                isActivated={asPath === "/flashcards"}
                icon={<CardStackIcon className="w-5 h-5 text-neutral-800" />}
              />
              <NavLinkItem
                title="Lista de tarefas"
                href="/todos"
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
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
                <div className="group flex gap-1 pr-1 py-1 items-center cursor-pointer hover:bg-primary-100 transition-colors rounded font-medium hover:font-semibold select-none pl-2">
                  Texto pa
                </div>
              </ScrollArea>
            </div>
          </nav>
          <Button className="mt-auto w-full">Criar</Button>
        </div>
      </div>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
};

export default TreeLayout;
