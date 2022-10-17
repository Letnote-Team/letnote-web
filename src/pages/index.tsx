import type { NextPage } from "next";
import { NavBar } from "../components/layouts/NavBar";
import { HeroSection } from "../components/layouts/HeroSection";

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className="absolute top-0 right-0 -z-10">
        <svg
          className="w-[800px] aspect-[566/460]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 566 460"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M202 -160C352.209 -217.304 488.95 -154.259 585.833 -26.1419C675.428 92.3362 699.112 256.162 611.354 376.117C598.123 394.202 582.855 408.822 566 420.452C482.057 478.375 358.749 462.154 251.732 430.538C130.859 394.828 16.7121 321.497 2.72754 196.31C-5.09714 126.266 4.5436 58.7473 30.797 0.499998C63.1571 -71.2959 120.757 -129.006 202 -160Z"
            fill="#ABDAFC"
          />
        </svg>
      </div>
      <main>
        <HeroSection />
      </main>
    </>
  );
};

export default Home;
