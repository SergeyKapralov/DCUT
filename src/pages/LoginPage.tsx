import { Navigate } from "react-router-dom";
import { LoginForm, useAuthStore } from "@/features/auth";

export const LoginPage = () => {
  const isAuthorized = useAuthStore((state) => state.token !== null);

  if (isAuthorized) return <Navigate to="/" replace />;

  return (
    <div className="flex w-full flex-col items-center gap-8 py-8 text-fg">
      <div className="border-border rounded-lg border bg-card p-6">
        <LoginForm />
      </div>
    </div>
  );
}