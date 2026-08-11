import { serverFetchWithRefresh } from "@/lib/serverAuth";
import { User } from "@/types";

export const getUserById = async (userId: string): Promise<User | null> => {
  if (!userId) {
    throw new Error("No userId provided");
  }

  try {
    const { data } = await serverFetchWithRefresh<User>(`/get_user_by_id/${userId}`);
    return data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

