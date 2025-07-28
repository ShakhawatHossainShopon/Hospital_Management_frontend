import { getAccessToken } from "./getToken";
import axios from "axios";

// Create Axios client
export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add Bearer Token to each request dynamically
client.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors globally
client.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error("Axios Error:", error.response || error.message);
        return Promise.reject(error);
    }
);