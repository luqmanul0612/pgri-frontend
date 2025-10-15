/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Footer } from "@/app/components/Footer";
import TextField from "@/components/customs/textfield";
import useAuth from "@/store/useAuth";
import { FC, forwardRef, RefAttributes, useEffect, useState } from "react";
import EmailIcon from "../assets/sms.svg";
import PhoneIcon from "../assets/call.svg";
import UserIcon from "../assets/profile-circle.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";
import * as Accordion from "@radix-ui/react-accordion";
import Checkbox from "@/components/customs/checkbox";
import CloseCircle from "../assets/close-circle.svg";
import {
  checkStatusPayment,
  getVaChannels,
  IPaymentStatusResponse,
  submitPayment,
} from "../serverActions/payment";
import Button from "@/components/customs/button";
import { useDebouncedCallback } from "@/utils/use-debounce-callback";
import PaymentSuccessImage from "../assets/payment-success-image.svg";
import { useRouter } from "next/navigation";
import { useRegistrationFormStore } from "@/store/use-registration-form";

interface PageProps {
  params: {};
}

interface IPaymentMethods {
  key: string;
  label: string;
  channels: {
    key: string;
    label: string;
  }[];
}

const initialPaymentStatus: IPaymentStatusResponse["data"] = {
  expiry_date: "",
  payment_page: "",
  status: "pending",
  total_amount: "",
  transaction_id: "",
  virtual_account_name: "",
  virtual_account_no: "",
};

const Page: FC<PageProps> = ({ params: {} }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const { resetForm } = useRegistrationFormStore();
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethods[]>([]);
  const [paymentStatus, setPaymentStatus] =
    useState<IPaymentStatusResponse["data"]>(initialPaymentStatus);
  const [method, setMethod] = useState("virtual_account");
  const [channel, setChannel] = useState("");

  const handlerPayment = async () => {
    const res = await submitPayment({
      channel,
      payment_method: method,
    });
    window.loadJokulCheckout(res.data?.payment_page);
  };

  const fetchVaChannels = useDebouncedCallback(async () => {
    const res = await getVaChannels();
    setPaymentMethod([
      {
        key: "virtual_account",
        label: "Virtual Account",
        channels: Object.entries(res.data).map(([key, value]) => ({
          key,
          label: value.name,
        })),
      },
    ]);
  }, 500);

  const fetchCheckStatusPayment = useDebouncedCallback(async () => {
    const res = await checkStatusPayment();
    const paymentModal = document.getElementById("jokul_checkout_modal");
    if (res.status === 200 && res.data) {
      setPaymentStatus(res.data);
      if (res.data.status === "pending" && !paymentModal) {
        window.loadJokulCheckout(res.data?.payment_page);
      } else if (res.data.status === "succeeded") {
        resetForm();
        if (paymentModal) paymentModal.remove();
      }
    } else if(res.status === 401) {
      resetForm();
      router.push("/register");
    }
  }, 500);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetchCheckStatusPayment();
    fetchVaChannels();
    setInterval(async () => {
      fetchCheckStatusPayment();
    }, 10000);
  }, []);

  return (
    <div className="bg-slate-100">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-[#17a3b8] px-[4vw] py-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#f5f7fb]">
              {paymentStatus.status === "succeeded"
                ? "Pembayaran Berhasil"
                : "Pembayaran"}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-xs font-normal text-[#f5f7fb]">
              {paymentStatus.status === "succeeded"
                ? "Terimakasih semua syarat registrasi sebagai Anggota PGRI kamu telah terpenuhi"
                : "Silakan pilih metode untuk pembayaran uang pangkal kamu"}
            </p>
          </div>
        </div>
      </div>
      {paymentStatus.status === "succeeded" && (
        <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center">
          <div className="flex max-w-[448px] flex-col items-center justify-center gap-5 rounded-[26px] p-[26px] shadow-[0_0_24px_0_rgba(0,0,0,0.25)]">
            <PaymentSuccessImage />
            <p className="text-center text-sm font-medium text-black">
              Syarat sebagai Anggota PGRI telah terpenuhi, jangan lupa untuk
              mengunduh Aplikasi Mobile PGRIKU kemudian masuk dengan Email dan
              kata sandi yang sebelumnya kamu buat!
            </p>
            <Button fullWidth onClick={() => router.push("/dashboard")}>
              Ok
            </Button>
          </div>
        </div>
      )}
      {["pending", "failed"].includes(paymentStatus.status) && (
        <div className="flex flex-col px-[4vw] py-28">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-extrabold text-black">
              Pembayaran Uang Pangkal
            </p>
            <CloseCircle
              className="hover:cursor-pointer"
              onClick={() => router.push("/register")}
            />
          </div>
          <div className="mt-5 rounded-[10px] border border-primary-50 bg-white p-4">
            <p className="text-lg font-medium text-black">Informasi Anggota</p>
            <div className="mt-5 flex gap-4">
              <TextField
                className="w-full"
                label="Nama Anggota"
                value={auth?.name}
                readOnly
                startIcon={
                  <UserIcon
                    className="text-primary-500"
                    width={24}
                    height={24}
                  />
                }
              />
              <TextField
                className="w-full"
                label="Email"
                value={auth?.email}
                readOnly
                startIcon={
                  <EmailIcon
                    className="text-primary-500"
                    width={24}
                    height={24}
                  />
                }
              />
              <TextField
                className="w-full"
                label="Nomor Handphone"
                value={auth?.phoneNumber}
                readOnly
                startIcon={
                  <PhoneIcon
                    className="text-primary-500"
                    width={24}
                    height={24}
                  />
                }
              />
            </div>
            <p className="mb-2 mt-5 text-lg font-medium text-black">
              Metode Pembayaran
            </p>
            <Accordion.Root
              className="w-full"
              type="single"
              defaultValue="virtual_account"
              collapsible
              value={method}
              onValueChange={(value) => {
                setMethod(value);
                setChannel("");
              }}
            >
              {paymentMethod.map((payMethod) => (
                <Accordion.Item
                  key={payMethod.key}
                  className="mt-[1px]"
                  value={payMethod.key}
                >
                  <AccordionTrigger>{payMethod.label}</AccordionTrigger>
                  <AccordionContent asChild>
                    <div className="flex flex-col items-start gap-4 px-3 py-2">
                      {payMethod.channels.map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-center gap-[10px]"
                        >
                          <Checkbox
                            id={"method" + item.key}
                            checked={channel === item.key}
                            onClick={() => setChannel(item.key)}
                          />
                          <label
                            htmlFor={"method" + item.key}
                            className="cursor-pointer text-sm font-normal text-black"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
            <Button
              fullWidth
              onClick={handlerPayment}
              className="mt-5"
              disabled={!channel || !method}
            >
              Lanjutkan ke Pembayaran
            </Button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  Accordion.AccordionTriggerProps & RefAttributes<HTMLButtonElement>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className="flex w-full items-center justify-between rounded-[5px] px-2 py-1 text-sm font-normal text-black transition-all hover:bg-primary-50"
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ArrowDownIcon
        className="text-primary-500"
        aria-hidden
        width={24}
        height={24}
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content className="" {...props} ref={forwardedRef}>
    <div className="">{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = "AccordionContent";
