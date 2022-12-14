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
  deleteNote: (id: string) => Promise<void>;
  refetchTree: () => Promise<void>;
  selectedId?: string;
  addNewTreeItem: (parent: TreeItemType) => void;
};

export const TreeItem = ({
  item,
  provided,
  onExpand,
  onCollapse,
  deleteNote,
  selectedId,
  refetchTree,
  addNewTreeItem,
}: RenderItemParams & TreeItemProps) => {
  const isSelected = selectedId === item.id;

  const handleRemoveNote = async () => {
    if (item.id.toString() !== "new-note") {
      await deleteNote(item.id.toString());
    }

    await refetchTree();
  };

  const handleAddNewNote = () => {
    addNewTreeItem(item);
    Router.push("/notes/new-note", undefined, {
      shallow: true,
    });
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
              desc="N??o ser?? poss??vel recuperar essa anota????o ap??s sua exclus??o."
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
