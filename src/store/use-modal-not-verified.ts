import { create } from "zustand";

export interface ModalNotVerifiedProps {
  showModalNotVerified: boolean;
}

interface ModalNotVerifiedState extends ModalNotVerifiedProps {
  setShowModalNotVerified: (value: boolean) => void;
}

const useModalNotVerified = create<ModalNotVerifiedState>((set, get) => ({
  showModalNotVerified: false,
  setShowModalNotVerified: (value) => {
    set({ showModalNotVerified: value });
  },
}));

export default useModalNotVerified;
