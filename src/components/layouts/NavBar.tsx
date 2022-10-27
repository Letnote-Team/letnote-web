import React from "react";
import { Button } from "../commons/Button";

type navBarProps = {
  onlyLogo?: boolean;
}

export const NavBar = ({ onlyLogo }: navBarProps) => {
  return (
    <header className="flex justify-between w-screen py-4 px-4 sm:px-12 md:px-16 lg:px-24 xl:px-52 2xl:px-64 ">
      <div className="text-3xl font-bold ">
        <span className="text-primary-700">let</span>note
      </div>
      {onlyLogo || 
        <nav>
          <Button type="secondary">Cadastre-se</Button>
          <Button type="primary">Entrar</Button>
        </nav>
      }
    </header>
  );
};