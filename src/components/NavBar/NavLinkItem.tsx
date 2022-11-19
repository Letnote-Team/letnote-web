import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type NavLinkItemProps = {
  title: string;
  href: string;
  icon?: ReactNode;
  isActivated: boolean;
};

export const NavLinkItem = ({
  title,
  href,
  icon,
  isActivated,
}: NavLinkItemProps) => {
  const { asPath } = useRouter();

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-2 p-1 cursor-pointer rounded hover:bg-primary-100
                ${isActivated ? "bg-primary-100 pl-2" : ""}
               focus:bg-primary-100 font-semibold text-lg transition-colors
                 focus:outline-none
                 focus:ring-2 focus:ring-offset-1 focus:ring-primary-300`}
    >
      {icon}
      {title}
    </Link>
  );
};
