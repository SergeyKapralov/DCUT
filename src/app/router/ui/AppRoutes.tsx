import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/features/auth";
import { Layout } from "@/features/layout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
};
