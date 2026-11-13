import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { ResendOtpParams } from "@/types";

type Error = AxiosError<
  {
    message?: string;
    errors?: { message: string }[];
  },
  any
>;

export const useResendOtp = (onSuccessCallback?: () => void) => {
  const { resendOtp } = useAuth();

  return useMutation<{ message: string }, Error, ResendOtpParams>({
    mutationFn: async ({ email }) => {
      return await resendOtp(email);
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "A new 6-digit verification code has been sent to your email!"
      );
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (err) => {
      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Failed to resend verification code. Please try again.";
      toast.error(msg);
    },
  });
};

export default useResendOtp;
