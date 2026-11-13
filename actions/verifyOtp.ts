import { axiosInstance } from "@/api";
import { UserData, VerifyOtpParams } from "../types";

export const verifyOtp = async (body: VerifyOtpParams): Promise<UserData> => {
  try {
    const res = await axiosInstance.post("/auth/verify-otp", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};
