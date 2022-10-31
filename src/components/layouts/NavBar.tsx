import Link from "next/link";
import React from "react";
import { Button } from "../commons/Button";

type navBarProps = {
  onlyLogo?: boolean;
}

export const NavBar = ({ onlyLogo }: navBarProps) => {
  return (
    <header className="flex justify-between w-screen py-4 px-4 xl:px-20 2xl:px-64 ">
      <Link href="/">
        <a>
          <div className="text-3xl font-bold ">
            <span className="text-primary-700">let</span>note
          </div>
        </a>
      </Link>
      {onlyLogo || 
        <nav>
          <Link href="/auth/signup">
            <a>
              <Button buttonType="secondary">Cadastre-se</Button>
            </a>
          </Link>
          <Link href="/auth/signin">
            <a>
              <Button buttonType="primary">Entrar</Button>
            </a>
          </Link>
        </nav>
      }
    </header>
  );
};