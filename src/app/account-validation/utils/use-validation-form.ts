import { create } from "zustand"
import { persist } from "zustand/middleware";

interface ValidationFormState {
  step: "CONFIRM" | "FORM" | "DONE"
  setStep: (step: ValidationFormState["step"]) => void
}

export const useValidationForm = create<ValidationFormState>()(
  persist(
    (set, get) => ({
      step: "CONFIRM",
      setStep: (step) => set({ step }),
    }),
    {
      name: "validation-form-storage",
      partialize: (state) => ({ step: state.step }),
    },
  ),
);