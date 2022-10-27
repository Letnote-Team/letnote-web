import { NextPage } from "next";
import { HeroSection } from "../components/layouts/HeroSection";
import { Layout } from "../components/layouts/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default Home;
