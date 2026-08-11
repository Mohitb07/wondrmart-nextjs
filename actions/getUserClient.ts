import { axiosInstance } from "@/api";
import { User } from "@/types";

export const getUserByIdClient = async (userId: string): Promise<User | null> => {
  if (!userId) {
    throw new Error("No userId provided");
  }

  try {
    const res = await axiosInstance.get<User>(`/get_user_by_id/${userId}`);
    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
