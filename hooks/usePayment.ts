import { payment } from "@/actions/payment";
import { PaymentMethod, PaymentParams, PaymentStatus } from "@/types";
import { useState } from "react";

const usePayment = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const handlePaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handlePayment = async (paymentData: PaymentParams) => {
    try {
      const res = await payment(paymentData);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handlePaymentStatus = (status: PaymentStatus) => {
    setPaymentStatus(status);
  };

  return {
    paymentMethod,
    handlePaymentMethod,
    paymentStatus,
    handlePayment,
    handlePaymentStatus,
  };
};

export default usePayment;
