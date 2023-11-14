import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from '@/store/useAuthStore';
import env from "@/lib/env";

const API_BASE_URL = env.apiUrl;

const axiosConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
};

const multipartConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
};

const axiosInstance = axios.create(axiosConfig);
const multipartInstance = axios.create(multipartConfig);

// Use the Axios interceptor to get the token value before each request and set it in the `Authorization` header
const setAuthTokenInterceptor = (config: any) => {
    const { token } = useAuthStore.getState();

    config.headers = config.headers || {};

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}

axiosInstance.interceptors.request.use(setAuthTokenInterceptor);
multipartInstance.interceptors.request.use(setAuthTokenInterceptor);

export { axiosInstance, multipartInstance };