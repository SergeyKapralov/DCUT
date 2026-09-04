import { useAuthStore } from "@/features/auth/model/store/authStore";

export function HomePage() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex w-full flex-col items-center gap-8 py-8 text-fg">
      <div className="text-2xl font-bold">first commit</div>
      <div className="border-border flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
        <div>Вы вошли в систему</div>
        <button type="button" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}