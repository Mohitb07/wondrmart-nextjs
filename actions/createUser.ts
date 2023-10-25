import axios from "axios";
import { SignUpFormData, UserData } from "../types";

export const createUser = async (body: SignUpFormData): Promise<UserData> => {
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  const res = await axios.post(`/auth/signup/api/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  return res.data;
};
