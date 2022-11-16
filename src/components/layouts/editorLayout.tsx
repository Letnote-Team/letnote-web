import { ReactNode } from "react";
import { useTree } from "../../hooks/useTree";
import { Logo } from "../commons/Logo";
import { Tree } from "../Tree/Tree";

const TreeLayout = ({ children }: { children?: ReactNode }) => {
  const { tree } = useTree();

  return (
    <div className="flex">
      <div
        className="w-64 p-4 bg-neutral-50 h-screen fixed overflow-hidden"
        aria-label="Sidebar"
      >
        <Logo />
        <div className="mt-8 space-y-1">
          <h1 className="font-bold">ANOTAÇÕES</h1>
          <div className="-ml-1">{tree && <Tree tree={tree} />}</div>
        </div>
      </div>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
};

export default TreeLayout;
