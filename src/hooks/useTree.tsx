import { mutateTree, TreeData, TreeItem } from "@atlaskit/tree";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../services/api";

type UpdateTreeOptions = {
  sync: boolean;
};

export const useTree = (initialData?: TreeData) => {
  const queryClient = useQueryClient();
  const [timeout, seTimeout] = useState();
  const { data: tree } = useQuery<TreeData>(
    ["notesTree"],
    async () => (await api.get("/notes/tree")).data,
    { initialData }
  );

  const updateTree = (newTree: TreeData) => {
    queryClient.setQueryData(["notesTree"], newTree);
  };

  const refetchTree = async () => {
    await queryClient.refetchQueries(["notesTree"]);
  };

  const addNewTreeItem = (parent?: TreeItem) => {
    if (!tree) return;

    parent ??= tree.items[0];

    const newTree: TreeData = mutateTree(tree, parent.id, {
      isExpanded: true,
      hasChildren: true,
      children: [...parent.children, "new-note"],
    });

    const newTreeItem: TreeItem = {
      id: "new-note",
      children: [],
      data: { title: "Sem título", parentId: Number(parent.id) },
      hasChildren: false,
      isExpanded: false,
    };

    Object.assign(newTree.items, { "new-note": newTreeItem });
    updateTree(newTree);
  };

  return { tree, updateTree, refetchTree, addNewTreeItem };
};
