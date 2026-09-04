import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLoginForm } from "../model/hooks/useLoginForm";

export const LoginForm = () => {
  const { form, inProgress, handleSubmit } = useLoginForm();
  const { t } = useTranslation();

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex w-72 flex-col gap-3"
    >
      <TextInput
        label={t("auth.email")}
        type="email"
        placeholder={t("auth.email_placeholder")}
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("auth.password")}
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Button type="submit" loading={inProgress}>
        {t("auth.submit")}
      </Button>
    </form>
  );
}