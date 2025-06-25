/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React, { useState } from "react";
import Warning from "../../../../../public/assets/warning-icon.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvalidVerificationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <FormModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[500px]">
      <div className="flex w-full flex-col items-center justify-center p-3 pt-5">
        <Warning className="mb-3 w-[80px] text-yellow-500" />
        <p className="mb-2 text-xl font-semibold">Akun belum terverifikasi</p>
        <p className="mb-4 text-center text-sm text-slate-700">
          Segera lengkapi data pekerjaan dan pembayaran uang pangkal untuk
          mengakses seluruh fitur. Verifikasi kelengkapan dapat dilakukan
          melalui aplikasi KTA PGRI versi web maupun mobile.
        </p>
        <button
          className={
            "flex w-full items-center justify-center rounded-2xl bg-[#17a3b8] py-4 text-sm text-white"
          }
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </FormModal>
  );
};

export default InvalidVerificationModal;
