import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useClickOutside } from "@/shared/model/hooks/useClickOutside";
import { useLockBodyScroll } from "@/shared/model/hooks/useLockBodyScroll";

type TModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

export const Modal = ({ open, onClose, title, children }: TModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useClickOutside(modalRef, onClose);
  useLockBodyScroll(open);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-3 flex items-center justify-center px-4">
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div
        ref={modalRef}
        className="border-border relative w-full max-w-sm rounded-lg border bg-card p-5 text-fg shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          {title && <h2 className="font-semibold">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("modal.close")}
            className="hover:bg-bg-secondary -m-1 flex size-8 shrink-0 items-center justify-center rounded-full text-fg-secondary transition"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};