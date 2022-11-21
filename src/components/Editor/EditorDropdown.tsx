import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DotFilledIcon,
  DownloadIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export const EditorDropdown = () => {
  const [model, setModel] = useState("linear");

  return (
    <DropdownMenu.Root defaultOpen={true}>
      <DropdownMenu.Trigger asChild>
        <button className=" p-3 rounded shadow-md outline-none">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={2}
          align="end"
          className="p-2 bg-white z-50 rounded shadow-md border-neutral-200 border cursor-default w-48"
        >
          <DropdownMenu.Label className="ml-1.5 mb-0.5 text-neutral-400">
            Modelo
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={model}
            onValueChange={setModel}
            className="w-full"
          >
            <DropdownMenu.RadioItem
              value="linear"
              className="group radix-state-checked:text-primary radix-highlighted:bg-primary-400 flex justify-between items-center gap-6 rounded radix-highlighted:!text-white outline-none px-2 py-1"
            >
              Linear/Normal
              <DropdownMenu.ItemIndicator className="text-primary group-radix-highlighted:text-white">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              value="cornell"
              className="group radix-state-checked:text-primary radix-highlighted:bg-primary-400 flex justify-between items-center gap-6 rounded radix-highlighted:!text-white outline-none px-2 py-1"
            >
              Cornell
              <DropdownMenu.ItemIndicator className="text-primary group-radix-highlighted:text-white">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Separator className="h-[1px] bg-neutral-300 my-2" />
          <DropdownMenu.Item className="group radix-state-checked:text-primary radix-highlighted:bg-primary-400 flex justify-between items-center gap-6 rounded radix-highlighted:!text-white outline-none px-2 py-1">
            Fazer download
            <DownloadIcon />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
