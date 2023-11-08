import axios from "axios";

import { SignInFormData, UserData } from "../types";

export const signInUser = async (body: SignInFormData): Promise<UserData> => {
  const formData = new FormData();
  Object.keys(body).forEach((key) => formData.append(key, body[key]));

  try {
    const res = await axios.post("/auth/signin/api/login", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("sign in user error", error.response);
      throw error;
    }
    throw error;
  }
};
