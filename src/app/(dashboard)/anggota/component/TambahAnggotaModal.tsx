/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React from "react";
import UploadGraySVG from "../../../../../public/icon/upload-gray";
import CloseRedSVG from "../../../../../public/icon/close-red";
import PlusCyanSVG from "../../../../../public/icon/plus-cyan";
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahAnggotaModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleTambahAnggota = () => {
    router.push('/register'); 
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="text-[16px] text-primaryBlack mb-4 font-semibold">Tambah Anggota</div>
          <div 
          onClick={onClose}
          className="cursor-pointer"><CloseRedSVG/></div>
          
          </div>
        <div className="text-xs text-primaryBlack mb-2">
          Kamu dapat menambahkan anggota baru secara langsung atau import data
          excel-mu!
        </div>
        <div className="rounded-xl border border-primary flex flex-col justify-center items-center p-4 mb-4 hover:opacity-70 transition-all duration-300 cursor-pointer">
          <UploadGraySVG/>
          <div className="text-xs mt-4">Tarik & Masukan file Excel untuk di Upload</div>
        </div>

        <div 
        onClick={handleTambahAnggota}
        className="border rounded-xl border-primary p-4 flex justify-between hover:opacity-70 transition-all duration-300 cursor-pointer">
          <div className="text-xs text-primary">Tambah Anggota Langsung</div>
          <div><PlusCyanSVG/></div>
        </div>

        <div className="rounded-xl p-4 hover:opacity-70 transition-all duration-300 cursor-pointer mt-4 bg-[#D4D4D4] text-[##919191] flex justify-center items-center text-sm">
          Tambah Sekarang
        </div>

      </div>
    </FormModal>
  );
};

export default TambahAnggotaModal;
