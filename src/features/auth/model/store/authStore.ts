import { createPersistedStore } from "@/shared/utils";
import type { TAuthState, TAuthStore } from "../types";

const initialState: TAuthState = {
  token: null,
};

export const useAuthStore = createPersistedStore<TAuthStore>("auth", (set) => ({
  ...initialState,
  setAuth: (token) =>
    set((state) => {
      state.token = token;
    }),
  logout: () =>
    set((state) => {
      state.token = null;
    }),
}));
