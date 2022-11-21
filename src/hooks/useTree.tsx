import { TreeData } from "@atlaskit/tree";
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

  return { tree, updateTree, refetchTree };
};
