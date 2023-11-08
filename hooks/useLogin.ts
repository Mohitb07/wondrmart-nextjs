import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { signInUser } from "@/actions/loginUser";
import { SignInFormData, UserData } from "../types";

type Error = AxiosError<
  {
    message: string;
  },
  any
>;

const useLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<UserData, Error, SignInFormData, UserData>({
    mutationFn: (data: SignInFormData) =>
      signInUser({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (data: UserData) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.href = "/";
    },
  });
  return mutation;
};

export default useLogin;