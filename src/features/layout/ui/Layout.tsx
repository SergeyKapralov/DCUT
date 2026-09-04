import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 64 }} footer={{ height: 48 }} padding="md">
      <Header />
      <AppShell.Main className="bg-bg-global flex justify-center">
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}