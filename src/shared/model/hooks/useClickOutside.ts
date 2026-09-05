import { useEffect, type RefObject } from "react";

type TEvent = MouseEvent | TouchEvent | FocusEvent;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: TEvent) => void,
  eventType: "mousedown" | "touchstart" = "mousedown",
) => {
  useEffect(() => {
    const handleEvent = (event: TEvent) => {
      const target = event.target as Node;
      if (!target || !target.isConnected) return;
      if (ref.current && !ref.current.contains(target)) {
        handler(event);
      }
    };

    document.addEventListener(eventType, handleEvent);
    return () => document.removeEventListener(eventType, handleEvent);
  }, [ref, eventType, handler]);
};