import Link from "next/link";
import React from "react";
import { Button } from "../commons/Button";
import { Image } from "../commons/Image";

export const HeroSection = () => (
  <section className="flex justify-between pl-4 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-52 2xl:pl-64 ">
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
    <div className="w-2/4">
      <div className="mb-5">
        <h1 className="mt-16 mb-2 font-bold text-5xl">
          <span className="text-primary-700">Crie, organize e compartilhe</span>{" "}
          anotações de forma simples
        </h1>
        <p className="text-lg">
          Com a utilização de recursos que promovem uma melhora na qualidade de
          aprendizagem e diferentes métodos de anotações
        </p>
      </div>
      <Link href='/auth/signup'>
        <Button type="primary" size="xl">
          Começar
        </Button>
      </Link>
    </div>
    <div className="relative w-[650px] h-[450px] mx-28">
      <div className="absolute left-60 animate-[float_5s_ease-in-out_infinite] ">
        <Image
          className="w-80 aspect-[250/361]"
          src="/imgs/robot.png"
          alt="Robô mexendo no computador"
        />
      </div>
      <div className="absolute left-16 bottom-10 animate-[float_3s_ease-in-out_infinite]">
        <Image
          className="w-32 aspect-[330/361]"
          src="/imgs/hand.png"
          alt="Robô mexendo no computador"
        />
      </div>
      <div className="absolute top-6 left-32 animate-[float_2.5s_ease-in-out_infinite]">
        <Image
          className="w-20 aspect-[1391/1721]"
          src="/imgs/note.png"
          alt="Robô mexendo no computador"
        />
      </div>
      <div className="absolute bottom-0 right-0 animate-[float_2s_ease-in-out_infinite]">
        <Image
          className="w-24 aspect-[285/361]"
          src="/imgs/calendar.png"
          alt="Robô mexendo no computador"
        />
      </div>
    </div>
  </section>
);