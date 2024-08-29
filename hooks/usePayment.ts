import { payment, cashPayment } from "@/actions/payment";
import {
  PaymentMethod,
  PaymentParams,
  PaymentStatus,
  CashPaymentParams,
} from "@/types";
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

  const handleCashPayment = async (paymentData: CashPaymentParams) => {
    try {
      const res = await cashPayment(paymentData);
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
    handleCashPayment,
    paymentStatus,
    handlePayment,
    handlePaymentStatus,
  };
};

export default usePayment;
