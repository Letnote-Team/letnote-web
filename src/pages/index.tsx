import { TreeData } from "@atlaskit/tree";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import EditorLayout from "../components/layouts/editorLayout";
import { api } from "../services/api";
import { getAPIClient } from "../services/axios";

const Home = ({ tree: initialTree, notes }) => {
  useQuery<TreeData>(
    ["notesTree"],
    async () => (await api.get("/notes/tree")).data,
    { initialData: initialTree }
  );

  useQuery<TreeData>(
    ["notes"],
    async () => (await api.get("/notes")).data.data,
    { initialData: notes }
  );

  return (
    <EditorLayout>
      <div className="flex flex-1 h-screen items-center justify-center font-bold text-4xl">
        Isso aí
      </div>
    </EditorLayout>
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
