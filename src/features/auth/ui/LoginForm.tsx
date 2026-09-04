import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useLoginForm } from "../model/hooks/useLoginForm";

export function LoginForm() {
  const { form, inProgress, handleSubmit } = useLoginForm();

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex w-72 flex-col gap-3"
    >
      <TextInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label="Пароль"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Button type="submit" loading={inProgress}>
        Войти
      </Button>
    </form>
  );
}