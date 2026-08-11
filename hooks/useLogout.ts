import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const logOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refresh_token");
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
    queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
    window.location.href = "/";
  };

  return { logOut };
};
