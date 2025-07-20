import React, { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Danger from "../../../../../public/assets/danger";
import { useRouter } from "next/navigation";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";
import { submitPayment } from "../serverActions/payment";
declare global {
  interface Window {
    loadJokulCheckout: (value: string) => void;
  }
}

const UangPangkal = () => {
  const router = useRouter();
  const { setStep } = useRegistrationStepStore();
  const handlerPayment = async () => {
    const res = await submitPayment("606", {
      channel: "bri",
      payment_method: "virtual_account",
    });
    console.log("first", res);
    window.loadJokulCheckout(res.data?.payment_page);
  };

  useEffect(() => {
    setTimeout(() => {
      const popup = document.getElementById("jokul_checkout_modal");
      popup?.remove();
    }, 5000);
  }, []);

  useEffect(() => {
    window.addEventListener("message", function (event) {
      console.log("Received message:", event.data);

      if (event.data?.status === "SUCCESS") {
        console.log("Payment success!");
      } else if (event.data?.status === "FAILED") {
        console.log("Payment failed!");
      } else if (event.data?.status === "CLOSED") {
        console.log("Popup closed without payment");
      }
    });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load script");
    };
    document.body.appendChild(script);
    script.onload = () => {
      console.log("script loaded");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          Pastikan Anda mengisi semua form, jika terdapat form isian pendaftaran
          yang terlewatkan maka Anda tidak dapat menekan tombol Selanjutnya!
        </p>
      </div>

      <div className="mb-4 mt-12 flex gap-4">
        <Button
          className="border-red w-full rounded-2xl border bg-white text-[#17a3b8] ring-1 ring-[#17a3b8]"
          onClick={() => router.push("/dashboard")}
        >
          Lewati
        </Button>
        <Button
          className="w-full rounded-2xl bg-[#17a3b8]"
          onClick={handlerPayment}
        >
          Bayar
        </Button>
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
