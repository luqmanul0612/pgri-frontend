"use client";

import { FC, useEffect } from "react";
import Modal from "../customs/modal";
import ExlamationIcon from "../../../public/assets/exclamation.svg";
import Button from "../customs/button";
import { usePathname, useRouter } from "next/navigation";
import useModalConfirmPayment from "@/store/use-modal-confirm-payment";
import { checkHasPaid } from "./server-funtion";

const ModalConfirmPayment: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openModalConfirmPayment, setOpenModalConfirmPayment } =
    useModalConfirmPayment();

  const onClickClose = () => {
    setOpenModalConfirmPayment(false);
    if (pathname === "/login") {
      router.push("/dashboard");
    }
  };

  const onClickPayment = () => {
    setOpenModalConfirmPayment(false);
    router.push("/register/payment");
  };

  useEffect(() => {
    (async () => {
      if (
        !(await checkHasPaid()) &&
        !openModalConfirmPayment &&
        pathname !== "/register/payment"
      ) {
        setOpenModalConfirmPayment(true);
      }
    })();
  }, []);

  return (
    <Modal
      open={openModalConfirmPayment}
      onClose={() => onClickClose()}
      title={
        pathname === "/login" ? "Konfirmasi Login" : "Konfirmasi Pembayaran"
      }
      width="500px"
    >
      <div className="mt-3 flex flex-col items-center gap-2">
        <ExlamationIcon />
        <p className="text-center text-[16px] font-bold">
          Pembayaran Belum Dilakukan
        </p>
        <p className="text-center text-[14px] font-normal">
          Anda belum menyelesaikan proses pembayaran. Silakan lakukan pembayaran
          terlebih dahulu.
        </p>
        <div className="mt-3 flex w-full items-center justify-between gap-4">
          <Button variant="secondary" fullWidth onClick={onClickClose}>
            {pathname === "/login" ? "Dashboard" : "Tutup"}
          </Button>
          <Button fullWidth onClick={onClickPayment}>
            Lanjutkan Pembayaran
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirmPayment;
