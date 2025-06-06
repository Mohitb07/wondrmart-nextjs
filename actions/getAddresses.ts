import { Address } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAddresses = async (userId: string): Promise<Address[]> => {
  const store = cookies();
  const token = store.get("accessToken")?.value;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${userId}/addresses/api`,
      {
        withCredentials: true,
        headers: {
          Cookie: token,
        },
      }
    );
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/login");
      }
      throw error;
    }
    throw error;
  }
};
