import { useState } from "react";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../config";
import { login } from "../api/login";
import { useAuthStore } from "../store/authStore";

export const useLoginForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inProgress, setInProgress] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (EMAIL_REGEX.test(value) ? null : t("auth.email_invalid")),
      password: (value) =>
        value.length >= 3 ? null : t("auth.password_invalid"),
    },
  });

  const handleSubmit = async () => {
    setInProgress(true);
    try {
      const { token } = await login();
      setAuth(token);
      navigate("/", { replace: true });
    } finally {
      setInProgress(false);
    }
  };

  return { form, inProgress, handleSubmit };
}