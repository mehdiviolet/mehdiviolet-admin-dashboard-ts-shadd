import LoginPage from "@/pages/LoginPage";
import ProtectedPage from "@/pages/ProtectedPage";
import Users from "@/features/users/users";
import Dashboard from "@/features/dashboard/Dashboard";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/pages/AppLayout";
import UserDetails from "@/features/users/UserDetails";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedPage />,
    children: [
      {
        element: <AppLayout />,
        // path: "/users",
        children: [
          { index: true, element: <Navigate to="/users" replace /> },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            element: <UserDetails />,
            path: "users/:userId",
          },
          {
            path: "*",
            element: <p>not founded!</p>,
          },
        ],
      },
    ],
  },
]);
