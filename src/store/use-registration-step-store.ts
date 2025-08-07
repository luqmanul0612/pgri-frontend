import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IStep {
  step: number;
  setStep: (step: number) => void;
}

export const useRegistrationStepStore = create<IStep>()(
  persist(
    (set, get) => ({
      step: 1,
      setStep: (step) => set({ step }),
    }),
    {
      name: "form-state-storage",
      partialize: (state) => ({ step: state.step }),
    },
  ),
);
