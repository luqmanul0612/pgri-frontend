/* eslint-disable @next/next/no-img-element */
import FormModal from "@/components/modal/FormModal";
import React, { useState } from "react";
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

type ButtonType = "dataPribadi" | "dataPekerjaan" | "foto";

const TolakModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<{
    dataPribadi: boolean;
    dataPekerjaan: boolean;
    foto: boolean;
  }>({
    dataPribadi: false,
    dataPekerjaan: false,
    foto: false,
  });

  const [text, setText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = (button: ButtonType) => {
    setActiveButton((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="mb-4 text-[16px] font-bold text-primaryBlack">
            Tolak Pendaftaran
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <CloseRedSVG />
          </div>
        </div>


        <div className="mb-2 text-center text-xs font-bold text-primaryBlack">
        Klik bagian mana yang ditolak dan jelaskan alasan penolakan secara detail!
        </div>
        <div className="mb-2 text-center text-xs font-bold text-[#ff0000]">
        Kamu bisa memilih semuanya jika ketiganya masih butuh perbaikan!
        </div>

        <div className="flex space-x-4 items-center justify-center">
      <button
        onClick={() => handleButtonClick("dataPribadi")}
        className={`px-4 py-2 rounded-lg text-xs border ${
          activeButton.dataPribadi ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-500 border-gray-500"
        }`}
      >
        Data Pribadi
      </button>
      <button
        onClick={() => handleButtonClick("dataPekerjaan")}
        className={`px-4 py-2 rounded-lg border  text-xs ${
          activeButton.dataPekerjaan ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-500 border-gray-500"
        }`}
      >
        Data Pekerjaan
      </button>
      <button
        onClick={() => handleButtonClick("foto")}
        className={`px-4 py-2 rounded-lg border text-xs ${
          activeButton.foto ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-500 border-gray-500"
        }`}
      >
        Foto
      </button>
    </div>

    <textarea
        id="inputText"
        value={text}
        onChange={handleTextChange}
        rows={3}
        placeholder="Tambahkan Keterangan"
        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 text-sm focus:ring-primary resize-none mt-4"
      />

        <div className="mt-4 flex cursor-pointer items-center justify-center rounded-xl bg-primary p-4 text-sm text-white transition-all duration-300 hover:opacity-70">
          Verifikasi
        </div>
      </div>
    </FormModal>
  );
};

export default TolakModal;
