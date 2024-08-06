import { axiosInstance } from "@/api";
import { PaymentParams } from "@/types";

export const payment = async (paymentData: PaymentParams) => {
  try {
    const res = await axiosInstance.post("/initiate_payment", paymentData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
