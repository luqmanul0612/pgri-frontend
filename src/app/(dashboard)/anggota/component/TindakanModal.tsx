/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React from "react";
import UploadGraySVG from "../../../../../public/icon/upload-gray";
import CloseRedSVG from "../../../../../public/icon/close-red";
import PlusCyanSVG from "../../../../../public/icon/plus-cyan";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  row: {
    original: {
      id: string | number;
      name: string;
    };
  };
}

const TindakanModal: React.FC<ModalProps> = ({ isOpen, onClose, row }) => {
  const router = useRouter();
  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="mb-4 text-[16px] font-bold text-primaryBlack">
            Nonaktifkan Anggota
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <CloseRedSVG />
          </div>
        </div>

        <div className="flex w-full items-center justify-center mb-4">
          <img alt="user" src="/assets/userstand.png" />
        </div>

        <div className="mb-2 text-center text-xs font-bold text-primaryBlack">
          Apakah kamu ingin menon-aktifkan Anggota dibawah ini?
        </div>
        <div className="mb-2 text-center text-sm font-bold text-[#ff0000]">
       "{row.original.name}"
        </div>

        <div className="mt-4 flex cursor-pointer items-center justify-center rounded-xl bg-[#ff0000] p-4 text-sm text-white transition-all duration-300 hover:opacity-70">
          Non Active kan
        </div>
      </div>
    </FormModal>
  );
};

export default TindakanModal;
