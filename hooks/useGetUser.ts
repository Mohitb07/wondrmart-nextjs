import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

import { getUser } from "@/actions/getUser";
import { User } from "../types";

type Error = AxiosError;

const useGetUser = () => {
  const token = Cookies.get("accessToken");
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  });
};

export default useGetUser;
