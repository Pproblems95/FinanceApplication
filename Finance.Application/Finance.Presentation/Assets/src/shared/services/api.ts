import axios, { AxiosError, type AxiosResponse } from "axios";

const apiURL = import.meta.env.VITE_DOMAIN_URL

const api = axios.create({
    baseURL: apiURL, 
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/';
        }
        console.error("API ERROR:", error.response?.data || "Unknown error");
        return Promise.reject(error);
    }
);

export default api;