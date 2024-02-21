import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getUser } from "@/actions/getUser";
import { User } from "../types";

type Error = AxiosError;

const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    onError: (error) => {
      console.error('Error while fetching user', error);
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
