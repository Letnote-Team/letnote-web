import { ButtonHTMLAttributes } from "react";

const ButtonThemeConfig = {
  type: {
    primary: "bg-primary text-white hover:bg-primary-600",
    secondary: "font text-neutral-700 hover:text-black",
    outlined: "bg-primary text-white hover:bg-primary-600",
  },

  size: {
    md: "text-md py-2 px-5",
    xl: "text-xl py-3 px-8",
  },
};

type ButtonType = {
  buttonType?: "primary" | "secondary" | "outlined";
  buttonSize?: "md" | "xl";
  loading?: boolean;
};

export const Button = ({
  buttonType = "primary",
  buttonSize = "md",
  loading = false,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonType) => {
  return (
    <button
      className={`
        rounded
        font-bold
        text-center
        transition-colors
        outline-none
        focus:ring-2
        focus:ring-offset-1
        focus:ring-primary
        ${loading && "opacity-80"}
        ${ButtonThemeConfig.type[buttonType]}
        ${ButtonThemeConfig.size[buttonSize]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="mx-auto animate-spin w-6 h-6 border-2 border-primary border-t-white border-r-white rounded-[50%]" />
      ) : (
        children
      )}
    </button>
  );
};
