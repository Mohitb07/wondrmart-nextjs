import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createUser } from "@/actions/createUser";
import { RegisterResponse, SignUpFormData } from "@/types";

type Error = AxiosError<
  {
    message?: string;
    errors?: { message: string; property?: "username" | "email" | "password" }[];
  },
  any
>;

const useRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, Error, SignUpFormData>({
    mutationFn: (data: SignUpFormData) =>
      createUser({
        email: data.email,
        confirmPassword: data.confirmPassword,
        password: data.password,
        username: data.username,
      }),
    onSuccess: (data: RegisterResponse, variables) => {
      const email = data.email || variables.email;
      toast.success(
        data.message ||
          "Registration successful! We have sent a 6-digit verification code to your email."
      );
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    },
  });
};

export default useRegister;
