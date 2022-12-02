import { TreeData } from "@atlaskit/tree";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import TreeLayout from "../components/layouts/editorLayout";
import { UserType } from "../contexts/AuthContext";
import { NoteType } from "../contexts/NoteContext";
import { useNote } from "../hooks/useNote";
import { useTree } from "../hooks/useTree";
import { getAPIClient } from "../services/axios";

type HomeProps = {
  tree: TreeData;
  user: UserType;
};

const Home = ({ tree, user }: HomeProps) => {
  useTree(tree);
  useNote();

  return (
    <TreeLayout>
      <div className="flex flex-1 h-screen items-center justify-center font-bold text-4xl">
        <h1>Bem vindo, {user.name}</h1>
      </div>
    </TreeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "letnote.user": _user } = parseCookies(ctx);
  const ssrApi = getAPIClient(ctx);

  try {
    if (_user) {
      const queryClient = new QueryClient();
      const { user } = JSON.parse(_user);
      const treeRequest = await ssrApi.get("/notes/tree");
      const tree = treeRequest.data;
      await queryClient.prefetchQuery(
        ["notes"],
        async () => (await ssrApi.get("/notes")).data.data
      );

      return {
        props: {
          user,
          tree,
          dehydratedState: dehydrate(queryClient),
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
