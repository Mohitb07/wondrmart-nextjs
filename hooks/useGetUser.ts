import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as Cookies from "tiny-cookie";

import { getUser } from "@/actions/getUser";
import { User } from "../types";

type Error = AxiosError;

const useGetUser = () => {
  const token = Cookies.getCookie("accessToken");
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  });
};

export default useGetUser;