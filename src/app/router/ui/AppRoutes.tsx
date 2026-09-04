import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/features/auth/ui/RequireAuth";
import { Layout } from "@/features/layout/ui/Layout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}