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

export default Home;
