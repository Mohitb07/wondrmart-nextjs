import { axiosInstance } from "@/api";
import { SignUpFormData, UserData } from "../types";

export const createUser = async (body: SignUpFormData): Promise<UserData> => {
  try {
    const res = await axiosInstance.post("/auth/register", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

