import { useAuth } from "@/features/auth/AuthContext";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>is loading ...</p>;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      ProtectedPage:
      <Outlet />
    </div>
  );
}
