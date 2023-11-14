import { useQueryClient } from "@tanstack/react-query";
import * as Cookies from "tiny-cookie";

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const logOut = () => {
    Cookies.removeCookie("accessToken");
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
    queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
    window.location.href = "/";
  };

  return { logOut };
};