import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { createUser } from "@/actions/createUser";
import { SignUpFormData, UserData } from "@/types";

type Error = AxiosError<
  {
    message: {
      [key in keyof SignUpFormData]: string;
    };
  },
  any
>;

const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation<UserData, Error, SignUpFormData, UserData>({
    mutationFn: (data: SignUpFormData) =>
      createUser({
        email: data.email,
        confirmPassword: data.confirmPassword,
        password: data.password,
        username: data.username,
      }),
    onSuccess: (data: UserData) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("data", data);
      window.location.href = "/";
    },
  });
};

export default useRegister;
