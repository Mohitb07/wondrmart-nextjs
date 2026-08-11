import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { SignInFormData } from "../types";

type Error = AxiosError<
  {
    errors: { message: string }[];
  },
  any
>;

const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation<void, Error, SignInFormData>({
    mutationFn: async (data) => {
      await login(data.email, data.password);
    },
    onSuccess: () => {
      router.push("/");
    },
  });
};

export default useLogin;
