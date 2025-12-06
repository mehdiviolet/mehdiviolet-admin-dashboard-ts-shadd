import axios from "axios";

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_SUPABASE_URL}/auth/v1`,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SUPABASE_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token} `;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => error
);
