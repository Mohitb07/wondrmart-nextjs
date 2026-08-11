import { axiosInstance } from "@/api";
import { Address } from "@/types";

export const getAddress = async (id: string): Promise<Address> => {
  try {
    const res = await axiosInstance.get(`/address/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};


