"use client";

import { FC } from "react";
import Modal from "../customs/modal";
import Button from "../customs/button";
import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";
import Image from "next/image";

const ModalUnderDevelopment: FC = () => {
  const { openModalUnderDevelopment, setOpenModalUnderDevelopment } =
    useModalUnderDevelopment();

  const onClickClose = () => {
    setOpenModalUnderDevelopment(false);
  };

  return (
    <Modal
      open={openModalUnderDevelopment}
      onClose={() => onClickClose()}
      title="Under Development"
      width="500px"
    >
      <div className="mt-3 flex flex-col items-center gap-2">
        <Image
          src="/assets/under-development.webp"
          alt="Under Development"
          width={100}
          height={100}
        />
        <p className="text-center text-[16px] font-bold">
          Dalam Tahap Pengembangan!
        </p>
        <p className="text-center text-[14px] font-normal">
          PGRI dan Tim sedang melakukan pengembangan di menu Pelatihan Anggota
        </p>
        <div className="mt-3 flex w-full items-center justify-between gap-4">
          <Button variant="secondary" fullWidth onClick={onClickClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalUnderDevelopment;
