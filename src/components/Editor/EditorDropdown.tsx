import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DotFilledIcon,
  DownloadIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useNote } from "../../hooks/useNote";
import { NoteType } from "../../contexts/NoteContext";

type EditorDropdownProps = {
  handleOnChange: (prop: string) => void;
};

export const EditorDropdown = ({ handleOnChange }: EditorDropdownProps) => {
  const { currentNote, setCurrentNote } = useNote();
  const [model, setModel] = useState(currentNote?.body?.noteModel ?? "linear");

  const handleDownload = () => {
    const { id: _, parent_id: __, ...note } = currentNote as NoteType;

    const file = new Blob([JSON.stringify(note)], {
      type: "application/json",
    });
    saveAs(file, currentNote?.title + ".json");
  };

  useEffect(() => {
    setModel(currentNote?.body?.noteModel ?? "linear");
  }, [currentNote]);

  return (
    <DropdownMenu.Root>
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
            onValueChange={(value) => {
              setCurrentNote((prev) =>
                prev
                  ? { ...prev, body: { ...prev.body, noteModel: value } }
                  : prev
              );
              handleOnChange(value);
            }}
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
          <DropdownMenu.Item
            className="group radix-state-checked:text-primary radix-highlighted:bg-primary-400 flex justify-between items-center gap-6 rounded radix-highlighted:!text-white outline-none px-2 py-1"
            onClick={handleDownload}
          >
            Fazer download
            <DownloadIcon />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
