import Container from "@/common/Container";
import useGetUser from "@/hooks/useGetUser";
import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { notFound } from "next/navigation";
import { getUser } from "@/actions/getUser";
import axios from "axios";
import { BASE_URL } from "@/api";
import { cookies } from "next/headers";

export const metadata = {
  title: "Order Placed",
  description: "Your order has been placed",
};

async function Complete() {
  const userCookie = cookies().get("accessToken")?.value;
  console.log("Complete -> userCookie", userCookie);
  try {
    const res = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${userCookie}`,
      },
    });
    console.log("Complete -> res", res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return notFound();
      }
    }
  }

  return (
    <Container>
      {/* 65px -> 4rem height of the navbar (4x16) = 64 + 1px (border-bottom) = 65px */}
      <div className="h-[calc(100vh-65px)] flex items-center justify-center lg:items-start lg:py-[4rem]">
        <div className="flex justify-center items-center flex-col space-y-4 mb-[50%]">
          <BsFillCartCheckFill className="text-6xl lg:text-7xl text-primary" />
          <h1 className="text-xl">Order Placed</h1>
          <p className="text-center text-xs text-slate-600 lg:text-sm">
            You will receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Complete;
