import { TreeData } from "@atlaskit/tree";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import TreeLayout from "../components/layouts/editorLayout";
import { NoteType, useNote } from "../hooks/useNote";
import { useTree } from "../hooks/useTree";
import { getAPIClient } from "../services/axios";

type HomeProps = {
  tree: TreeData;
  notes: NoteType[];
};

const Home = ({ tree, notes }: HomeProps) => {
  useTree(tree);
  useNote(notes);

  return (
    <TreeLayout>
      <div className="flex flex-1 h-screen items-center justify-center font-bold text-4xl">
        Isso aí
      </div>
    </TreeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "letnote.user": user } = parseCookies(ctx);
  const ssrApi = getAPIClient(ctx);

  try {
    if (user) {
      const treeRequest = await ssrApi.get("/notes/tree");
      const notesRequest = await ssrApi.get("/notes");
      const tree = treeRequest.data;
      const notes = notesRequest.data.data;

      return {
        props: {
          tree,
          notes,
        },
      };
    }
  } catch (e) {
    if ((e as AxiosError).response?.statusText === "Unauthenticated.") {
      destroyCookie(ctx, "letnote.user");
    }
  }

  return {
    redirect: {
      destination: "/product",
      permanent: false,
    },
  };
};

export default Home;
