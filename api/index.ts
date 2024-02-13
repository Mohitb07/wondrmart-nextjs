import axios from "axios";
import Cookies from "js-cookie";
import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const queryClient = new QueryClient();

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log("request error", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    // console.log("response error", err);
    if (err.response && err.response.status === 401) {
      let token = null;
      if (typeof window !== "undefined") {
        token = Cookies.get("accessToken");
      }
      if (token) {
        Cookies.remove("accessToken");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
      }
      window.location.replace("/auth/signin");
    }
    return Promise.reject(err);
  }
);
