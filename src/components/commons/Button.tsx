import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const ButtonThemeConfig = {
  type: {
    primary: "bg-primary text-white hover:bg-primary-600 focus:ring-primary",
    secondary: "bg-primary-600 text-white hover:text-black focus:ring-primary",
    outlined: "text-neutral-700 hover:text-black focus:ring-primary",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  },

  size: {
    md: "text-md py-2 px-5",
    xl: "text-xl py-3 px-8",
  },
};

type ButtonType = {
  buttonType?: "primary" | "secondary" | "outlined" | "danger";
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
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonType) => {
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
        focus:outline-none
        ${loading && "opacity-80"}
        ${ButtonThemeConfig.type[buttonType]}
        ${ButtonThemeConfig.size[buttonSize]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div
          className={`mx-auto animate-spin w-6 h-6 border-2  border-t-white border-r-white rounded-[50%]
        ${buttonType === "danger" ? "border-red-500" : "border-primary"}`}
        />
      ) : (
        children
      )}
    </button>
  );
};
