import {
  mutateTree,
  RenderItemParams,
  TreeData,
  TreeItem as TreeItemType,
} from "@atlaskit/tree";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Cross2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Router from "next/router";
import { AlertDialog } from "../commons/AlertDialog";

type TreeItemProps = {
  updateTree: (newTree: TreeData) => void;
  deleteNote: (id: number) => Promise<void>;
  refetchTree: () => Promise<void>;
  tree: TreeData;
  selectedId?: string;
};

export const TreeItem = ({
  item,
  provided,
  onExpand,
  onCollapse,
  snapshot,
  updateTree,
  deleteNote,
  tree,
  selectedId,
  refetchTree,
}: RenderItemParams & TreeItemProps) => {
  const isSelected = selectedId === item.id;

  function handleAddNewNote() {
    const newTree: TreeData = mutateTree(tree, item.id, {
      isExpanded: true,
      hasChildren: true,
      children: [...item.children, "new-note"],
    });

    const newTreeItem: TreeItemType = {
      id: "new-note",
      children: [],
      data: { title: "Sem título", parentId: Number(item.id) },
      hasChildren: false,
      isExpanded: false,
    };

    Object.assign(newTree.items, { "new-note": newTreeItem });
    updateTree(newTree);
    Router.push("/notes/new-note", undefined, {
      shallow: true,
    });
  }

  const handleRemoveNote = async () => {
    await deleteNote(+item.id);
    await refetchTree();
  };

  const handleNoteClick = () => {
    Router.push("/notes/" + item.id, undefined, { shallow: true });
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
    >
      <div
        onClick={(e) => {
          handleNoteClick();
          e.stopPropagation();
        }}
        className={`group flex gap-1 pr-1 py-1 items-center cursor-pointer
                hover:bg-primary-100 transition-colors rounded font-medium
                  hover:font-semibold select-none focus:outline-none
                  ${item.hasChildren ? "pl-1" : "pl-2"}
                  ${isSelected ? "bg-primary-100 italic" : ""}`}
      >
        {item.hasChildren && (
          <span className="">
            {item.isExpanded ? (
              <ChevronDownIcon
                onClick={(e) => {
                  onCollapse(item.id);
                  e.stopPropagation();
                }}
              />
            ) : (
              <ChevronRightIcon
                onClick={(e) => {
                  onExpand(item.id);
                  e.stopPropagation();
                }}
              />
            )}
          </span>
        )}
        <span className="truncate">{item.data.title}</span>
        <span className="ml-auto hidden group-hover:flex group-hover:z-50">
          <span className="p-1 hover:bg-primary-200 rounded hover:shadow-sm">
            <PlusIcon
              onClick={(e) => {
                e.stopPropagation();
                handleAddNewNote();
              }}
            />
          </span>
          <span className="p-1 hover:bg-red-200 rounded hover:shadow-sm">
            <AlertDialog
              title="Tem certeza que deseja fazer isso?"
              desc="Não será possível recuperar essa anotação após sua exclusão."
              onActionConfirm={handleRemoveNote}
            >
              <Cross2Icon
                onClick={(e) => e.stopPropagation()}
                color="#ef4444"
              />
            </AlertDialog>
          </span>
        </span>
      </div>
    </div>
  );
};
