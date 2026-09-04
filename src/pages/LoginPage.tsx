import { Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { useAuthStore } from "@/features/auth/model/store/authStore";

export function LoginPage() {
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