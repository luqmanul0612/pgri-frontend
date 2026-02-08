import { create } from "zustand";

export interface ModalConfirmPaymentProps {
  openModalConfirmPayment: boolean;
}

interface ModalConfirmPaymentState extends ModalConfirmPaymentProps {
  setOpenModalConfirmPayment: (value: boolean) => void;
}

const useModalConfirmPayment = create<ModalConfirmPaymentState>((set) => ({
  openModalConfirmPayment: false,
  setOpenModalConfirmPayment: (value) => {
    set({ openModalConfirmPayment: value });
  },
}));

export default useModalConfirmPayment;
