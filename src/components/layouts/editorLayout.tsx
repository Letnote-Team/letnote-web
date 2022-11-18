import { ReactNode } from "react";
import { useTree } from "../../hooks/useTree";
import { Logo } from "../commons/Logo";
import { Tree } from "../Tree/Tree";
import { Button } from "../commons/Button";

const TreeLayout = ({ children }: { children?: ReactNode }) => {
  const { tree } = useTree();

  return (
    <div className="flex">
      <div
        className="w-64 xl:w-80 p-4 bg-neutral-50 h-screen fixed top-0 bottom-0 overflow-hidden"
        aria-label="Sidebar"
      >
        <Logo />
        <div className="flex justify-between flex-col h-[calc(100%-36px)]">
          <div className="mt-8 flex gap-1">
            <h1 className="font-bold">ANOTAÇÕES</h1>
            <div className="-ml-1">{tree && <Tree tree={tree} />}</div>
          </div>
          <Button className="mt-auto w-full">Criar</Button>
        </div>
      </div>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
};

export default TreeLayout;
