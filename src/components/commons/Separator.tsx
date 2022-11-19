import React from "react";
import * as SeparatorRadix from "@radix-ui/react-separator";

type SeparatorProps = {
  className?: string;
};

export const Separator = ({ className }: SeparatorProps) => {
  return (
    <SeparatorRadix.Root
      className={`h-[1px] bg-neutral-300 w-full ${className}`}
    />
  );
};
