export type TAuthState = {
  token: string | null;
};

export type TAuthActions = {
  setAuth: (token: string) => void;
  logout: () => void;
};

export type TAuthStore = TAuthState & TAuthActions;