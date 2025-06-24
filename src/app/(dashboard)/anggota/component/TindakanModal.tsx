/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React, { useState } from "react";
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
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    // performAction(value);
  };
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

        <div className="flex flex-col space-y-2">
      {/* <label htmlFor="reportSelect" className="text-sm font-medium text-gray-700">
        Alasan Pelaporan
      </label> */}
      <select
        id="reportSelect"
        value={selectedOption}
        onChange={handleSelectChange}
        className="w-full p-3 border border-gray-300 rounded-xl  focus:outline-none focus:ring-1 focus:ring-primary mb-2"
      >
        <option value="" disabled>
          Pilih Alasan Penonaktifan Anggota
        </option>
        <option value="melanggar aturan">Melanggar Aturan</option>
        <option value="melanggar kebijakan privasi">Melanggar Kebijakan Privasi</option>
        <option value="lain-lain">Lain-lain</option>
      </select>
    </div>

        <div className="mt-4 flex cursor-pointer items-center justify-center rounded-xl bg-[#ff0000] p-4 text-sm text-white transition-all duration-300 hover:opacity-70">
          Non Active kan
        </div>
      </div>
    </FormModal>
  );
};

export default TindakanModal;
