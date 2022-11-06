import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Logo } from "../components/commons/Logo";
import { Editor } from "../components/Editor";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-64 p-4 bg-neutral-50 h-screen" aria-label="Sidebar">
        <Logo />
      </div>
      <Editor />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "letnote.user": user } = parseCookies(ctx);

  if (!user) {
    return {
      redirect: {
        destination: "/product",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
