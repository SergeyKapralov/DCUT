import { useState } from "react";
import { useForm } from "@mantine/form";
import { EMAIL_ERROR_MESSAGE, EMAIL_REGEX, PASSWORD_ERROR_MESSAGE } from "../config";
import { login } from "../api/login";
import { useAuthStore } from "../store/authStore";

export function useLoginForm() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const [inProgress, setInProgress] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (EMAIL_REGEX.test(value) ? null : EMAIL_ERROR_MESSAGE),
      password: (value) =>
        value.length >= 3 ? null : PASSWORD_ERROR_MESSAGE,
    },
  });

  const handleSubmit = async () => {
    setInProgress(true);
    try {
      const { token } = await login();
      setAuth(token);
    } finally {
      setInProgress(false);
    }
  };

  return { form, inProgress, handleSubmit };
}