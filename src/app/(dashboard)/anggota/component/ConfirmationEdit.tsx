import React from "react";
import FormModal from "@/components/modal/FormModal";
import CloseRedSVG from "../../../../../public/icon/close-red";
import UploadGraySVG from "../../../../../public/icon/upload-gray";
import PlusCyanSVG from "../../../../../public/icon/plus-cyan";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationEdit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="text-[16px] text-primaryBlack mb-4 font-semibold">Ubah Data Anggota</div>
          <div
            onClick={onClose}
            className="cursor-pointer"><CloseRedSVG /></div>
        </div>
        <div>
          <div className="flex w-full items-center justify-center mb-4">
            <img alt="user" width={"70"} className={"h-[70px] w-[60px]"} src="/assets/verifikasi.png" />
          </div>
          <div className={"flex flex-col gap-1.5 mb-5"}>
            <h3 className={"text-primaryBlack text-center leading-tight text-sm font-medium"}>Apakah kamu yakin untuk
              melakukan perubahan atau update data
              Anggota</h3>
            <p className={"text-[#ff0000] text-center text-xs"}>“Mohammad Alfath, MM, S.Kom”</p>
          </div>
          <button className={"flex items-center justify-center bg-[#17a3b8] py-4 text-sm text-white w-full rounded-2xl"}
                  onClick={onClose}>
            Ya, Perbaharui
          </button>

        </div>
      </div>
    </FormModal>
  );
};

export default ConfirmationEdit;
