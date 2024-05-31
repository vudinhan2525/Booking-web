"use client";

import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({
        status,
        id,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`${status === "success" && "border-[#2ec946]"} ${
              status === "error" && "border-[#FF3B30]"
            } ${
              status === "info" && "border-[#007AFF]"
            } rounded-lg mt-2 items-center w-[350px] min-h-[85px] shadow-md border-[0px] border-l-[12px]  bg-[#fff] font-medium text-black`}
          >
            <div className="flex justify-between items-center gap-5 font-OpenSans h-full w-full">
              <div className="flex items-center gap-5">
                <div className="relative w-6">
                  {status === "error" && (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="text-[#FF3B30] w-8 h-8"
                    />
                  )}
                  {status === "success" && (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[#2EC946] w-8 h-8"
                    />
                  )}
                  {status === "info" && (
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="text-[#007AFF] w-8 h-8"
                    />
                  )}
                </div>
                <div className="mt-[-12px]">
                  {status === "success" && (
                    <p className="text-lg leading-[28px] font-bold">Success</p>
                  )}
                  {status === "info" && (
                    <p className="text-lg leading-[28px] font-bold">Info</p>
                  )}
                  {status === "error" && (
                    <p className="text-lg leading-[28px] font-bold">Error</p>
                  )}
                  <p className="text-xs leading-[12px] text-gray-600">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
