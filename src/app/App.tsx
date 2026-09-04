import { MantineProvider } from "@mantine/core";
import { ThemeSwitcher } from "@/features/theme/ui/ThemeSwitcher";
import { useThemeStore } from "@/features/theme/model/store/themeStore";
import { useAuthStore } from "@/features/auth/model/store/authStore";
import { LoginForm } from "@/features/auth/ui/LoginForm";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = token !== null;

  const forceColorScheme = theme === "auto" ? undefined : theme;

  return (
    <MantineProvider forceColorScheme={forceColorScheme}>
      <div className="bg-bg flex min-h-screen w-full flex-col items-center gap-8 pt-8 text-fg">
        <ThemeSwitcher />
        <div className="text-2xl font-bold">first commit</div>
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-3">
            <div>Вы вошли в систему</div>
            <button type="button" onClick={logout}>
              Выйти
            </button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </MantineProvider>
  );
}

export default App;