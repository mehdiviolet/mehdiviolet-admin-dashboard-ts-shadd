import { authApi } from "@/lib/axios";
import type { User } from "./AuthContext";

interface LoginResponse {
  access_token: string;
  user: User;
}
// 1.Login
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await authApi.post("/token?grant_type=password", {
    email,
    password,
  });

  localStorage.setItem("SUPABASE_TOKEN", response.data.access_token);

  console.log(response.data);

  return response.data;
};

// 2.GET USER

export const getMe = async (): Promise<User> => {
  const response = await authApi.get("/user");
  return response.data;
};

// 3.LOG OUT
export const logOut = async (): Promise<void> => {
  await authApi.post("/logout");
};
