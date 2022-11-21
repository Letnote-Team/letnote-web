import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type NavItemProps = {
  title: string;
  icon?: ReactNode;
  isActivated: boolean;
};

export const NavItem = ({ title, icon, isActivated }: NavItemProps) => {
  return (
    <div
      className={`group w-full flex items-center gap-2 p-1 cursor-pointer rounded hover:bg-primary-100
                    ${isActivated ? "bg-primary-100 pl-2" : ""}
                    focus:bg-primary-100 font-semibold text-lg transition-colors
                    focus:outline-none
                    focus:ring-2 focus:ring-offset-1 focus:ring-primary-300`}
    >
      {icon}
      {title}
      <span className="hidden group-hover:flex"></span>
    </div>
  );
};
