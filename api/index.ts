import axios from "axios";
import * as Cookies from "tiny-cookie";
import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const queryClient = new QueryClient();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.getCookie("accessToken");
    config.headers.Authorization = `Bearer ${token}`;
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
      const token = Cookies.getCookie("accessToken");
      if (token) {
        Cookies.removeCookie("accessToken");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
      }
      window.location.replace("/auth/signin");
    }
    return Promise.reject(err);
  }
);
