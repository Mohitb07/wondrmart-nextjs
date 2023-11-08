import { useContext } from "react";
import { AuthUserContext } from "../context/authUser";

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error("useAuthUser must be used within a AuthUserProvider");
  }
  return context;
};
