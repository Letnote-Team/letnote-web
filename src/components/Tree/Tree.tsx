import TreeComponent, {
  ItemId,
  moveItemOnTree,
  mutateTree,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from "@atlaskit/tree";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useNote } from "../../hooks/useNote";
import { useTree } from "../../hooks/useTree";
import { TreeItem } from "./TreeItem";

type TreeProps = {
  tree: TreeData;
};

export const Tree = ({ tree }: TreeProps) => {
  const router = useRouter();
  const { updateTree, refetchTree } = useTree();
  const { updateNote, deleteNote } = useNote();
  const queryClient = useQueryClient();

  const changeExpandedProp = (itemId: ItemId, isExpanded: boolean) => {
    const newTree = mutateTree(tree, itemId, { isExpanded });

    updateTree(newTree);
  };

  const onExpand = (itemId: ItemId) => {
    changeExpandedProp(itemId, true);
  };

  const onCollapse = (itemId: ItemId) => {
    changeExpandedProp(itemId, false);
  };

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) {
      return;
    }

    const newTree = moveItemOnTree(tree, source, destination);
    queryClient.setQueryData(["notesTree"], newTree);
    const { parentId, index } = source;
    const id = Number(tree.items[parentId.toString()].children[index]);

    const { parentId: newParentId } = destination;

    updateNote({
      id,
      parentId: Number(newParentId) === 0 ? null : Number(newParentId),
    });
  };

  return (
    <TreeComponent
      isNestingEnabled
      isDragEnabled
      onExpand={onExpand}
      onCollapse={onCollapse}
      renderItem={(props) =>
        TreeItem({
          ...props,
          tree,
          updateTree,
          deleteNote,
          selectedId: router.query?.id?.toString(),
          refetchTree,
        })
      }
      onDragEnd={onDragEnd}
      tree={tree}
    />
  );
};
