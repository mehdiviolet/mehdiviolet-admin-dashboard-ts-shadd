import { loginUser } from "@/features/auth/authApi";
import { useAuth } from "@/features/auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (variable: { email: string; password: string }) =>
      loginUser(variable.email, variable.password),
    onSuccess: (data) => {
      setUser(data.user);
      navigate("/user");
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate({ email, password });
  };

  return (
    <div>
      LoginPage
      <form onSubmit={handleLogin}>
        <label htmlFor="">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login!</button>
      </form>
    </div>
  );
}
