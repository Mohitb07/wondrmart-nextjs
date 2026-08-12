import { axiosInstance } from "@/api";

export const setDefaultUserAddress = async (addressId: string) => {
  try {
    if (!addressId) return;
    const res = await axiosInstance.patch(`/set_default_address/${addressId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
