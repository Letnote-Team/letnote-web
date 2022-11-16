import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import {
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import * as RadixToast from "@radix-ui/react-toast";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toastInterceptor } from "../interceptors/toastInterceptor";

const ToastThemeConfig = {
  type: {
    success: {
      icon: <CheckIcon className="h-8 w-8 text-green-500" />,
      class: "bg-green-100 focus-visible:ring-green-500 after:bg-green-500",
    },
    error: {
      icon: <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />,
      class: "bg-red-100 focus-visible:ring-red-500 after:bg-red-500",
    },
    warning: {
      icon: <ExclamationTriangleIcon className="h-8 w-8 text-orange-500" />,
      class: "bg-orange-100 focus-visible:ring-orange-500 after:bg-orange-500",
    },
  },
};

export type ToastDataType = {
  title: string;
  desc: string;
  type: "success" | "error" | "warning";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ShowFn = (data: ToastDataType) => {};

export const ToastContext = createContext({
  show: ShowFn,
});

export function ToastProvider(props: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState<ToastDataType>();

  const show: typeof ShowFn = (data) => {
    setOpen(false);

    setToastData(data);

    setTimeout(() => {
      setOpen(true);
    }, 200);
  };

  toastInterceptor(show);

  return (
    <ToastContext.Provider
      value={{
        show,
      }}
    >
      <RadixToast.Provider>
        {props.children}
        {toastData && (
          <>
            <RadixToast.Root
              open={open}
              onOpenChange={setOpen}
              className={`
                fixed inset-x-4
                bottom-4 right-4 left-auto min-w-[20rem] max-w-md cursor-pointer rounded-sm
                px-4 py-3 shadow-md

                after:absolute after:bottom-0 after:left-0 after:block after:h-1
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-offset-2 radix-state-open:animate-toast-slide-in-bottom

                radix-state-open:after:animate-[progress_5s] radix-state-open:hover:after:animation-pause
                radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]
                radix-state-closed:animate-toast-hide radix-swipe-end:animate-toast-swipe-out
                translate-x-radix-toast-swipe-move-x
                ${ToastThemeConfig.type[toastData.type].class}`}
            >
              <RadixToast.Close className="absolute top-2 right-2">
                <AccessibleIcon.Root label="close">
                  <Cross2Icon />
                </AccessibleIcon.Root>
              </RadixToast.Close>
              <div className="flex items-center gap-4">
                <div className="min-h-[2rem] min-w-[2rem]">
                  {ToastThemeConfig.type[toastData.type].icon}
                </div>
                <div className="flex flex-col">
                  <RadixToast.Title className="text-lg font-bold">
                    {toastData?.title}
                  </RadixToast.Title>
                  <RadixToast.Description>
                    {toastData?.desc}
                  </RadixToast.Description>
                </div>
              </div>
            </RadixToast.Root>
            <RadixToast.Viewport />{" "}
          </>
        )}
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
