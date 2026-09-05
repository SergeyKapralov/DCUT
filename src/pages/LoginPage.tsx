import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { LoginForm, useAuthStore } from "@/features/auth";

export const LoginPage = () => {
  const { t } = useTranslation();
  const isAuthorized = useAuthStore((state) => state.token !== null);

  if (isAuthorized) return <Navigate to="/" replace />;

  return (
    <div className="text-fg flex w-full flex-col items-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-2xl font-bold">{t("pages.login_title")}</div>
        <div className="text-fg-secondary text-center text-sm">
          {t("pages.login_subtitle")}
        </div>
      </div>
      <div className="border-border bg-card rounded-lg border p-6">
        <LoginForm />
      </div>
    </div>
  );
};
