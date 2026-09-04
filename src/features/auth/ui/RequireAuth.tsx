import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../model/store/authStore";

export function RequireAuth() {
  const isAuthorized = useAuthStore((state) => state.token !== null);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
}