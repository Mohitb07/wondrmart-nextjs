import axios from "axios";
import { SignUpFormData, UserData } from "../types";

export const createUser = async (body: SignUpFormData): Promise<UserData> => {
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  try {
    const res = await axios.post(`/auth/signup/api/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("create user", res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
