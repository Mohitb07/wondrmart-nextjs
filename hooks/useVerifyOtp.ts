import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import { UserData, VerifyOtpParams } from "@/types";

type Error = AxiosError<
  {
    message?: string;
    errors?: { message: string }[];
  },
  any
>;

interface UseVerifyOtpOptions {
  redirectTo?: string;
  onSuccessCallback?: (data: UserData) => void;
}

export const useVerifyOtp = (options?: UseVerifyOtpOptions) => {
  const { verifyOtp } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<UserData, Error, VerifyOtpParams>({
    mutationFn: async ({ email, otp }) => {
      return await verifyOtp(email, otp);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account verified successfully! Welcome to wondrMart 🎉");

      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      } else {
        router.push(options?.redirectTo || "/");
      }
    },
    onError: (err) => {
      const msg =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Verification failed. Please check the code and try again.";
      toast.error(msg);
    },
  });
};

export default useVerifyOtp;
