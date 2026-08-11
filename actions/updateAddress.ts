import axios from "axios";
import { Address, AddressFormData } from "../types";
import { axiosInstance } from "@/api";

export const updateAddress = async (
  data: AddressFormData
): Promise<Address> => {
  const params = new URLSearchParams(window.location.search);
  const formData = new FormData();
  Object.keys(data).forEach((key) =>
    formData.append(key, JSON.stringify(data[key]))
  );
  const body: AddressFormData = {
    name: JSON.parse(formData.get("name") as string),
    mobile: JSON.parse(formData.get("mobile") as string),
    pinCode: JSON.parse(formData.get("pinCode") as string),
    country: JSON.parse(formData.get("country") as string),
    state: JSON.parse(formData.get("state") as string),
    city: JSON.parse(formData.get("city") as string),
    area: JSON.parse(formData.get("area") as string),
    apartment: JSON.parse(formData.get("apartment") as string),
    isDefault: JSON.parse(formData.get("isDefault") as string),
  };
  try {
    const res = await axiosInstance.patch(`/update_address/${params.get("id")}`, body);
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
