import { BASE_URL } from "@/api";
import { SignUpFormData } from "@/types";
import axios from "axios";

export async function POST(request: Request) {
  const formData = await request.formData();
  const body: SignUpFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
  };

  const res = await axios.post(`${BASE_URL}/register`, body, {
    headers: { "Content-Type": "application/json" },
  });
  const accessToken = res.data.accessToken;

  if (accessToken) {
    const cookie = `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`;
    return new Response(res.data, {
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } else {
    return new Response(res.data, {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
