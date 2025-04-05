"use client";

import toast, { ToastBar, Toaster } from "react-hot-toast";
import { HiX } from "react-icons/hi";

const CustomNotification = () => {
  return (
    <Toaster
      reverseOrder={false}
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "8px",
          background: "#232531",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              <div className="flex flex-col gap-2 text-[10px] sm:text-xs z-50">
                <div className="error-alert cursor-default flex items-center justify-between w-full rounded-lg  px-[10px]">
                  <div className="flex gap-4 items-center">
                    {icon}
                    <div>
                      <p className="text-white text-base">Try Again</p>
                      <p className="text-gray-400 text-sm -ml-3">{message}</p>
                    </div>
                  </div>
                  {t.type !== "loading" && (
                    <button
                      className="rounded-full p-1 ring-primary-400 transition text-gray-400 hover:bg-[#444] focus:outline-none focus-visible:ring"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <HiX />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomNotification;
