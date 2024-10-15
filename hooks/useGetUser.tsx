import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/actions/getUser";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import { CustomError, User } from "../types";

const useGetUser = () => {
  const token = Cookies.get("accessToken");
  return useQuery<User, CustomError>({
    queryKey: ["user"],
    queryFn: getUser,
    onError: (err) => {
      if (token) {
        const errors = err.response?.data.errors || [];
        toast(errors[0].message, {
          icon: (
            <div className="text-red-500">
              <MdErrorOutline className="text-2xl" />
            </div>
          ),
          duration: 3000,
        });
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
