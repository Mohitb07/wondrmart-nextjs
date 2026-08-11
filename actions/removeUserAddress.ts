import { axiosInstance } from "@/api";

export const removeUserAddress = async (addressId: string) => {
  try {
    if (!addressId) return;
    const res = await axiosInstance.delete(`/delete_address/${addressId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
