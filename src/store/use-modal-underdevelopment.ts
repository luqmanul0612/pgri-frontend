import { create } from "zustand";

export interface ModalUnderDevelopmentProps {
  openModalUnderDevelopment: boolean;
}

interface ModalUnderDevelopmentState extends ModalUnderDevelopmentProps {
  setOpenModalUnderDevelopment: (value: boolean) => void;
}

const useModalUnderDevelopment = create<ModalUnderDevelopmentState>((set) => ({
  openModalUnderDevelopment: false,
  setOpenModalUnderDevelopment: (value) => {
    set({ openModalUnderDevelopment: value });
  },
}));

export default useModalUnderDevelopment;
