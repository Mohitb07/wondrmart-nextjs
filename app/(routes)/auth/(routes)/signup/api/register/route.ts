import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/api";
import { SignUpFormData } from "@/types";

export async function POST(request: Request) {
  const formData = await request.formData();
  const body: SignUpFormData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
  };

  try {
    const res = await axios.post(`${BASE_URL}/register`, body, {
      headers: { "Content-Type": "application/json" },
    });

    const accessToken = res.data.accessToken;
    if (!accessToken) {
      throw new Error("Access token not found in response");
    }

    const cookie = `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`;
    return new Response(JSON.stringify(res.data), {
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 409,
        });
      }
    }

    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
