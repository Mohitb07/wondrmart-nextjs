import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const logOut = () => {
    Cookies.remove("accessToken");
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
    queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
    window.location.href = "/";
  };

  return { logOut };
};
