import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
};

export const ScrollArea = ({ children, className }: ScrollAreaProps) => {
  return (
    <ScrollAreaRadix.Root className={className}>
      <ScrollAreaRadix.Viewport className="h-full">
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className="ml-4 flex select-none touch-none p-[2px] bg-primary-100 w-2"
        orientation="vertical"
      >
        <ScrollAreaRadix.Thumb
          className="flex-1 bg-primary rounded-xl relative
                                          before:absolute before:top-1/2 before:left-1/2
                                          before:-translate-x-1/2 before:-translate-y-1/2
                                          before:w-full before:h-full"
        />
      </ScrollAreaRadix.Scrollbar>
    </ScrollAreaRadix.Root>
  );
};
