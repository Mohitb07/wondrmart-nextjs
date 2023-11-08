import { axiosInstance } from "@/api";
import { User } from "@/types";

export const getUser = async (): Promise<User> => {
  const res = await axiosInstance.get("/me");
  return res.data;
};
