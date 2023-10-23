import axios from "axios";
import * as Cookies from "tiny-cookie";

import { BASE_URL } from "../api";
import { SignUpFormData, UserData } from "../types";

export const createUser = async (body: SignUpFormData): Promise<UserData> => {
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  const res = await axios.post(`/auth/signup/api/register`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log('res', res)
  const accessToken = res.data.accessToken;
  return res.data;
};
