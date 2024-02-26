import { axiosInstance } from "@/api";
import { User } from "@/types";
import Cookies from "js-cookie";

export const getUser = async (): Promise<User> => {
  const token = Cookies.get("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const res = await axiosInstance.get("/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};
