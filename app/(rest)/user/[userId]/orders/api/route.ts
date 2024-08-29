import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // console.log('request window', request.cookies.get('accessToken')?.value);
  // const cookie = request.cookies.get("accessToken")?.value;
  // const cookie = request.headers.get("Cookie");
  const state = request.headers.get("State");
  let cookie;
  if(state === 'client'){
    cookie = request.headers.get("Cookie")?.split('=')[1];
  }else {
    cookie = request.headers.get('Cookie')
  }  

  try {
    const res = await axios.get(`${process.env.BASE_URL}/orders`, {
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

    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
