import { Label } from "@radix-ui/react-label";
import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type inputProps = {
  title: string;
  error?: FieldError;
};

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & inputProps
>(({ title, error, ...props }, ref) => {
  return (
    <div className="space-y-1 w-90 2xl:text-base">
      <Label className="text-[#3f3f3f]" htmlFor={props.name}>
        {title}
      </Label>
      <input
        ref={ref}
        className={`w-full
        px-4 py-2
        placeholder:2xl:text-base placeholder:text-[#a5a5a5]
        rounded-md
        bg-[#FAFAFA] border border-[#DBDBDB] focus:border-primary focus:ring-primary
        ${error && "border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
        {...props}
      />
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
});
