import { useState } from "react";
import { DoorClosed, DoorOpen } from "lucide-react";
import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Modal } from "@/shared/ui/Modal";
import { useAuthStore } from "@/features/auth";

export const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    setConfirmOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={t("layout.logout")}
        onClick={() => setConfirmOpen(true)}
        className="group text-fg-secondary hover:bg-bg-secondary hover:text-fg flex h-10 w-10 items-center justify-center rounded-full transition"
      >
        <span className="relative block h-6 w-6">
          <DoorClosed
            size={24}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          />
          <DoorOpen
            size={24}
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </span>
      </button>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={t("layout.logout")}
      >
        <div className="flex flex-col gap-4">
          <p className="text-fg-secondary text-sm">
            {t("layout.logout_confirm")}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="subtle" onClick={() => setConfirmOpen(false)}>
              {t("layout.confirm_no")}
            </Button>
            <Button onClick={confirmLogout}>{t("layout.confirm_yes")}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
