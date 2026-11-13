import { axiosInstance } from "@/api";
import { ResendOtpParams } from "../types";

export const resendOtp = async (
  body: ResendOtpParams
): Promise<{ message: string }> => {
  try {
    const res = await axiosInstance.post("/auth/resend-otp", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};
