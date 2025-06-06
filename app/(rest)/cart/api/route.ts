import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.headers.get("Cookie")?.split("=")[1];
  try {
    const res = await axios.get(`${process.env.BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

    return new Response(
      JSON.stringify({ errors: [{ message: "Something went wrong" }] }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
}
