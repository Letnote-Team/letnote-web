import * as AlertDialogRadix from "@radix-ui/react-alert-dialog";
import { MouseEvent, ReactNode, Ref, useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { Button } from "./Button";

type AlertDialogProps = {
  children: ReactNode;
  title: string;
  desc: string;
  onActionConfirm: () => Promise<void>;
};

export const AlertDialog = ({
  children,
  onActionConfirm,
  title,
  desc,
}: AlertDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleActionConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await onActionConfirm();
    setOpen(false);
    toast.show({
      title: "Deletado",
      desc: "",
      type: "success",
    });
  };

  return (
    <AlertDialogRadix.Root open={open} onOpenChange={setOpen}>
      <AlertDialogRadix.Trigger asChild>{children}</AlertDialogRadix.Trigger>
      <AlertDialogRadix.Portal>
        <AlertDialogRadix.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <AlertDialogRadix.Content className="max-w-md fixed space-y-4 z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded">
          <div>
            <AlertDialogRadix.Title className="font-bold text-lg mb-2">
              {title}
            </AlertDialogRadix.Title>
            <AlertDialogRadix.Description>{desc}</AlertDialogRadix.Description>
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialogRadix.Cancel asChild>
              <Button buttonType="outlined">Cancelar</Button>
            </AlertDialogRadix.Cancel>
            <AlertDialogRadix.Action asChild>
              <Button
                loading={loading}
                buttonSize="md"
                onClick={handleActionConfirm}
                className="w-24"
                buttonType="danger"
              >
                Deletar
              </Button>
            </AlertDialogRadix.Action>
          </div>
        </AlertDialogRadix.Content>
      </AlertDialogRadix.Portal>
    </AlertDialogRadix.Root>
  );
};
