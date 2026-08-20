"use client";

import toast, { ToastBar, Toaster, resolveValue } from "react-hot-toast";
import { HiX } from "react-icons/hi";

const CustomNotification = () => {
  return (
    <Toaster
      reverseOrder={false}
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: "8px",
          background: "#232531",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon }) => (
            <div className="flex items-center justify-between w-full gap-4 text-xs z-50">
              <div className="flex gap-3 items-center">
                {icon}
                <div className="text-left">
                  <p className="text-white text-sm font-bold leading-tight">
                    {t.type === "success"
                      ? "Success"
                      : t.type === "error"
                        ? "Action Failed"
                        : t.type === "loading"
                          ? "Please wait..."
                          : "Notification"}
                  </p>
                  <p className="text-gray-300 text-xs mt-0.5 leading-normal">
                    {resolveValue(t.message, t)}
                  </p>
                </div>
              </div>
              {t.type !== "loading" && (
                <button
                  className="rounded-full p-1 ring-primary-400 transition text-gray-400 hover:bg-[#444] hover:text-white focus:outline-none focus-visible:ring ml-2"
                  onClick={() => toast.dismiss(t.id)}
                  aria-label="Close notification"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomNotification;
