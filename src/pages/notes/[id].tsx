import { TreeData } from "@atlaskit/tree";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { Editor } from "../../components/Editor";
import TreeLayout from "../../components/layouts/editorLayout";
import { NoteType, useNote } from "../../hooks/useNote";
import { useTree } from "../../hooks/useTree";
import { getAPIClient } from "../../services/axios";

type NotesProps = {
  tree?: TreeData;
  notes?: NoteType[];
};

const Notes = ({ notes: initialNotes, tree: initialTree }: NotesProps) => {
  useTree(initialTree);
  const { getNoteById } = useNote(initialNotes);
  let note = {} as any;
  const {
    query: { id },
  } = useRouter();

  if (id !== "new-note") {
    note = getNoteById(id!.toString());
  }

  return (
    <TreeLayout>
      <Editor title={note?.title} data={note?.body ?? {}} />
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

export default Notes;
