import { create, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createPersistedStore = <T>(
  name: string,
  stateCreator: StateCreator<
    T,
    [["zustand/persist", unknown], ["zustand/immer", never]]
  >,
) =>
  create<T>()(
    persist(immer(stateCreator), {
      name,
      storage: createJSONStorage(() => localStorage),
    }),
  );
