import { logOut } from "@/features/auth/authApi";
import { useAuth } from "@/features/auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const { setIsLoading, setUser } = useAuth();
  // const handleLogout = async () => {
  //   await logOut();
  // };

  const logOutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      console.log("logouted!!");
      setUser(null);
      setIsLoading(false);
      navigate("/login");
    },
  });

  return (
    <div>
      <header>
        <nav className="flex gap-4">
          <Link to="/users">users</Link>
          <Link to="/dashboard">dashboard</Link>
          <button onClick={() => logOutMutation.mutate()} className="ml-auto">
            logout
          </button>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
