import { SignInFormData } from "@/types";
import axios from "axios";

export async function POST(request: Request) {
  const formData = await request.formData();

  const body: SignInFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("body", body);
  try {
    const res = await axios.post(`${process.env.BASE_URL}/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    const user = res.data.user;
    const accessToken = res.data.accessToken;

    if (user && accessToken) {
      const cookie = `accessToken=${accessToken}; Path=/; SameSite=Strict`;
      return new Response(res.data, {
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
        status: 200,
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
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
