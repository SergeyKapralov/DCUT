import { LOGIN_DELAY_MS } from "../config";

export const login = (): Promise<{ token: string }> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ token: crypto.randomUUID() }), LOGIN_DELAY_MS),
  );
};
