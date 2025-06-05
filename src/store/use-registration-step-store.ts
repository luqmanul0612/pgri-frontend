import { create } from "zustand";

interface IStep {
  step: number;
  setStep: (step: number) => void;
}

export const useRegistrationStepStore = create<IStep>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));
