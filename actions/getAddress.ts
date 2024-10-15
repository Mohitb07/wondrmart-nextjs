import { Address } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";

export const getAddress = async (id: string): Promise<Address> => {
  const currentURL = window.location.href;
  const filteredURL = currentURL.split("?")[0];
  try {
    const res = await axios.get(`${filteredURL}/api`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        id,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/login");
      }
    }
    throw error;
  }
};
