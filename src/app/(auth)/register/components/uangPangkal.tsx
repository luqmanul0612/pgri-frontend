import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Danger from "../../../../../public/assets/danger";
import { useRouter } from "next/navigation";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";

const UangPangkal = () => {
  const router = useRouter();
  const { setStep } = useRegistrationStepStore();
  return (
    <div className="w-full max-w-[600px] rounded-2xl border border-[#17a3b8]/20 p-4">
      <div className="flex flex-col items-center rounded-md bg-[#17a3b8]/20 p-5 text-[#17a3b8]">
        <h2 className="text-[16px]">Total Bayar</h2>
        <h1 className="text-[34px] font-bold">Rp15.000</h1>
        <div className="flex text-[12px]">
          <Image
            alt="uang-pangkal"
            src={"/assets/money-tick.png"}
            width={14}
            height={14}
          />
          <span className="ml-1">Uang Pangkal</span>
        </div>
      </div>

      <div className="my-4">
        <h1 className="text-xs text-[#17191C]">
          Uang pangkal adalah uang komitmen untuk seluruh anggota baru PGRI
          (Persatuan Guru Republik Indonesia) dan wajib dibayarkan diawal
          pendaftaran. Kamu dapat melakukan Pembayaran dengan Via Bank, Alfamart
          dan Indomart
        </h1>
      </div>

      <div className="flex items-center rounded-lg bg-[#ff0000]/10 p-2.5">
        <Danger />
        <p className="ml-2.5 text-xs font-normal text-[#ff0000]">
          Pastikan anda mengisi semua form, jika terdapat form isian pendaftaran
          yang terlewatkan maka anda tidak dapat menekan tombol Selanjutnya!
        </p>
      </div>

      <div className="mb-4 mt-12 flex gap-4">
        <Button
          className="border-red w-full rounded-2xl border bg-white text-[#17a3b8] ring-1 ring-[#17a3b8]"
          onClick={() => router.push("/")}
        >
          Lewati
        </Button>
        <Button className="w-full rounded-2xl bg-[#17a3b8]">Bayar</Button>
      </div>
      <Button
        className="w-full rounded-2xl bg-[#ff0000]"
        onClick={() => {
          setStep(3);
        }}
      >
        Kembali
      </Button>
    </div>
  );
};

export default UangPangkal;
