import axios from "axios";
import { Address, AddressFormData } from "../types";

export const updateAddress = async (
  data: AddressFormData
): Promise<Address> => {
  const currentURL = window.location.href;
  const filteredURL = currentURL.split("?")[0];
  const params = new URLSearchParams(window.location.search);
  const formData = new FormData();
  Object.keys(data).forEach((key) =>
    formData.append(key, JSON.stringify(data[key]))
  );
  try {
    const res = await axios.patch(`${filteredURL}/api`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data", id: params.get("id") },
    });
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      throw error;
    }
    throw error;
  }
};
