import axios from "axios";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

type Params = {
  userId: string;
  orderId: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  // console.log('request window', request.cookies.get('accessToken')?.value);
  // const cookie = request.cookies.get("accessToken")?.value;
  // const cookie = request.headers.get("Cookie");
  const orderId = context.params.orderId;
  const state = request.headers.get("State");
  let cookie;
  if (state === "client") {
    cookie = request.headers.get("Cookie")?.split("=")[1];
  } else {
    cookie = request.headers.get("Cookie");
  }

  try {
    const res = await axios.get(`${process.env.BASE_URL}/order/${orderId}`, {
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
