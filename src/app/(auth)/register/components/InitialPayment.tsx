import React from "react";
import Danger from "../assets/danger.svg";
import { useRouter } from "next/navigation";
import Button from "@/components/customs/button";
import { useRegistrationFormStore } from "@/store/use-registration-form";
declare global {
  interface Window {
    loadJokulCheckout: (value: string) => void;
  }
}

const InitialPayment = () => {
  const router = useRouter();
  const { resetForm } = useRegistrationFormStore();

  return (
    <div className="w-full max-w-[600px] rounded-2xl border border-primary-100 bg-white p-4">
      <h3 className="mb-2 text-lg font-bold text-black">Uang Pangkal</h3>
      <p className="mb-4 text-xs font-normal text-black">
        Merupakan uang komitmen untuk seluruh anggota baru PGRI dan wajib
        dibayarkan diawal pendaftaran. Sebagai anggota baru kamu dapat melakukan
        Pembayaran Bank, Alfamart, Indomaret dan lainnya!
      </p>
      <div className="flex flex-col items-center rounded-md bg-[#17a3b8]/20 p-5 text-[#17a3b8]">
        <h2 className="text-[16px]">Uang Pankal</h2>
        <h1 className="text-[34px] font-bold">Rp45.000</h1>
      </div>
      <div className="mt-5 flex items-center rounded-lg bg-[#ff0000]/10 p-2.5">
        <Danger className="min-w-[18px]"/>
        <p className="ml-2.5 text-xs font-normal text-[#ff0000]">
          Pembayaran dapat dilakukan setelah menekan tombol bayar, kamu dapat
          memilih berbagai opsi layanana bayar Mulai dari Doku Wallet, Virtual
          Account Bank, Transfer Bank, Alfamart & Indomaret ataupun lainnya.
        </p>
      </div>

      <div className="mb-4 mt-6 flex w-full gap-4">
        {/* <Button
          fullWidth
          variant="secondary"
          onClick={() => {
            resetForm();
            router.push("/dashboard");
          }}
        >
          Lewati
        </Button> */}
        <Button fullWidth onClick={() => router.push("/register/payment")}>
          Bayar
        </Button>
      </div>
    </div>
  );
};

export default InitialPayment;
