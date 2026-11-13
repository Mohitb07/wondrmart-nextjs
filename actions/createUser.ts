import { axiosInstance } from "@/api";
import { RegisterResponse, SignUpFormData } from "../types";

export const createUser = async (
  body: SignUpFormData
): Promise<RegisterResponse> => {
  try {
    const res = await axiosInstance.post("/auth/register", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};


