import { axiosInstance } from "@/api";
import { CashPaymentParams, PaymentParams } from "@/types";

export const payment = async (paymentData: PaymentParams) => {
  try {
    const res = await axiosInstance.post("/initiate_payment", paymentData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const cashPayment = async (paymentData: CashPaymentParams) => {
  try {
    const res = await axiosInstance.post("/cash_transaction", paymentData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
