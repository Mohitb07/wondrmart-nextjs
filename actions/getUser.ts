import { axiosInstance, BASE_URL } from "@/api";
import { User } from "@/types";
import axios from "axios";
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

export const getUserById = async (userId: string): Promise<User | null> => {
  if (!userId) {
    throw new Error("No userId provided");
  }
  try {
    const res = await axios.get(BASE_URL + `/get_user_by_id/${userId}`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // user doesn't exist
    }
    throw error;
  }
};
