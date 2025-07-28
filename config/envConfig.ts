export const envConfig = {
    devMode: process.env.NEXT_PUBLIC_NODE_ENV === "development",
    backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};