import Link from "next/link";
import React from "react";
import { Button } from "../commons/Button";
import { Logo } from "../commons/Logo";

type navBarProps = {
  onlyLogo?: boolean;
}

export const NavBar = ({ onlyLogo }: navBarProps) => {
  return (
    <header className="flex justify-between w-screen py-4 px-4 xl:px-20 2xl:px-64 ">
      <Logo />
      {onlyLogo || 
        <nav>
          <Link href="/auth/signup">
            <Button buttonType="secondary">Cadastre-se</Button>
          </Link>
          <Link href="/auth/signin">
            <Button buttonType="primary">Entrar</Button>
          </Link>
        </nav>
      }
    </header>
  );
};