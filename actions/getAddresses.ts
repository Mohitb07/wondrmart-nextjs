import { axiosInstance } from "@/api";
import { Address } from "@/types";

export const getAddresses = async (): Promise<Address[]> => {
  try {
    const res = await axiosInstance.get("/addresses");
    return res.data;
  } catch (error) {
    throw error;
  }
};


