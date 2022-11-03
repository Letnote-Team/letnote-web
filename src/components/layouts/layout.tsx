import React, { ReactNode } from "react";
import { NavBar } from "./NavBar";

type layoutProps = {
  children: ReactNode;
  onlyLogo?: boolean;
}

export const Layout = ({ children, onlyLogo = false }: layoutProps) => {
  return (
    <div className='h-screen w-screen'>
      <NavBar onlyLogo={onlyLogo} />
      <main className='h-[calc(100vh-136px)]'>
        {children}
      </main>
    </div>
  );
};