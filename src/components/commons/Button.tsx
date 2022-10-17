import { ReactNode } from "react";

const ButtonThemeConfig = {
  type: {
    primary: 'bg-primary text-white hover:bg-primary-600',
    secondary: 'font text-neutral-700 hover:text-black',
    outlined: 'bg-primary text-white hover:bg-primary-600',  
  },

  size: {
    md: 'text-md py-2 px-5',
    xl: 'text-xl py-3 px-8',
  }
}

type ButtonType = {
  type?: 'primary' | 'secondary' | 'outlined';
  size?: 'md' | 'xl';
  children?: ReactNode;
};

export const Button = ({
  type = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonType) => {
  return (
    <button className={`
        rounded
        font-bold
        text-center
        transition-colors
        ${ButtonThemeConfig.type[type]}
        ${ButtonThemeConfig.size[size]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}