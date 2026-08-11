import { axiosInstance } from "@/api";
import { SignInFormData, UserData } from "../types";

export const signInUser = async (body: SignInFormData): Promise<UserData> => {
  try {
    const res = await axiosInstance.post("/auth/login", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

