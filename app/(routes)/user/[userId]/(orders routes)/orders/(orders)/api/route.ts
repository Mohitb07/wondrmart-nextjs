import axios from "axios";
import { NextRequest } from "next/server";

type Params = {
  userId: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const userId = context.params.userId;
  const state = request.headers.get("State");
  let cookie;
  if (state === "client") {
    cookie = request.headers.get("Cookie")?.split("=")[1];
  } else {
    cookie = request.headers.get("Cookie");
  }

  try {
    const res = await axios.get(`${process.env.BASE_URL}/orders/${userId}`, {
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
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return new Response(JSON.stringify(error.response.data), {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        });
      } else if (error.response?.status === 404) {
        return new Response(
          JSON.stringify({
            errors: [{ message: error.response.data.errors[0].message }],
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 404,
          }
        );
      } else if (error.response?.status === 403) {
        return new Response(
          JSON.stringify({
            errors: [{ message: error.response.data.errors[0].message }],
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 403,
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ errors: [{ message: "Something went wrong" }] }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
