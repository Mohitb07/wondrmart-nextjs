import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { Address } from "../types";
import useGetUser from "./useGetUser";

type Error = AxiosError;

const useGetAddresses = () => {
  const { data: user } = useGetUser();

  const query = useQuery<Address[], Error>({
    queryKey: ["addresses"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${user?.customer_id}/addresses/api`,
          {
            headers: {
              Cookie: Cookies.get("accessToken"),
              State: "client",
            },
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            redirect("/login");
          }
          throw error;
        }
        throw error;
      }
    },
  });

  return {
    ...query,
  };
};

export default useGetAddresses;
