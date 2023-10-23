import axios from "axios";
import * as Cookies from "tiny-cookie";
import { QueryClient } from "@tanstack/react-query";

export const BASE_URL = process.env.BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const queryClient = new QueryClient();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.getCookie("oms_access_token");
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
    console.log("response error", err);
    if (err.response && err.response.status === 401) {
      const token = Cookies.getCookie("oms_access_token");
      if (token) {
        Cookies.removeCookie("oms_access_token");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["cartItems"], exact: true });
      }
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);