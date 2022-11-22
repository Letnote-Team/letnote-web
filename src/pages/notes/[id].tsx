import { TreeData } from "@atlaskit/tree";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { Editor } from "../../components/Editor";
import TreeLayout from "../../components/layouts/editorLayout";
import { noteFetch, NoteType } from "../../contexts/NoteContext";
import { useNote } from "../../hooks/useNote";
import { useTree } from "../../hooks/useTree";
import { getAPIClient } from "../../services/axios";

type NotesProps = {
  tree?: TreeData;
  notes?: NoteType[];
};

const Notes = ({ notes: initialNotes, tree: initialTree }: NotesProps) => {
  const { getNoteById } = useNote();
  useTree(initialTree);

  let note = {} as NoteType;
  const {
    query: { id },
  } = useRouter();

  if (id !== "new-note") {
    note = getNoteById(id as string);
  }

  return (
    <TreeLayout>
      <Editor title={note?.title} data={note?.body} />
    </TreeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isCSR = ctx.req.url?.startsWith("/_next");

  if (isCSR) {
    return {
      props: {},
    };
  }

  const { "letnote.user": user } = parseCookies(ctx);
  const ssrApi = getAPIClient(ctx);

  try {
    if (user) {
      const queryClient = new QueryClient();
      const treeRequest = await ssrApi.get("/notes/tree");
      const tree = treeRequest.data;
      await queryClient.prefetchQuery(
        ["notes"],
        async () => (await ssrApi.get("/notes")).data.data
      );

      return {
        props: {
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

export default Notes;
