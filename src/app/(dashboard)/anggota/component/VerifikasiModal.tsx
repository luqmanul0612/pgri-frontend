/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React from "react";
import UploadGraySVG from "../../../../../public/icon/upload-gray";
import CloseRedSVG from "../../../../../public/icon/close-red";
import PlusCyanSVG from "../../../../../public/icon/plus-cyan";
import { useRouter } from "next/navigation";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: IMemberByIdResponse;
}

const VerifikasiModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const router = useRouter();
  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="mb-4 text-[16px] font-bold text-primaryBlack">
            Verifikasi Anggota
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <CloseRedSVG />
          </div>
        </div>

        <div className="flex w-full items-center justify-center mb-4">
          <img alt="user" src="/assets/verifikasi.png" />
        </div>

        <div className="mb-2 text-center text-xs font-bold text-primaryBlack">
        Silakan verifikasi Anggota, jika data yang di unggah sesuai dengan ketentuan PGRI
        </div>
        <div className="mb-2 text-center text-xs font-bold text-[#ff0000]">
        “Pastikan anda sudah mengecek Data Pribadi - Data Pekerjaan - Foto”
        </div>

        <div className="mt-4 flex cursor-pointer items-center justify-center rounded-xl bg-primary p-4 text-sm text-white transition-all duration-300 hover:opacity-70">
          Verifikasi
        </div>
      </div>
    </FormModal>
  );
};

export default VerifikasiModal;
