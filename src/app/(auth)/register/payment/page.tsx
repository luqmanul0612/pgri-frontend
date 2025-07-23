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
import { submitPayment } from "../serverActions/payment";
import Button from "@/components/customs/button";

interface PageProps {
  params: {};
}

const paymentMethod = [
  {
    key: "virtual_account",
    label: "Virtual Account",
    channels: [
      {
        key: "bri",
        label: "VA BRI",
      },
    ],
  },
];

const Page: FC<PageProps> = ({ params: {} }) => {
  const { auth } = useAuth();
  const [method, setMethod] = useState("virtual_account");
  const [channel, setChannel] = useState("");
  const handlerPayment = async () => {
    const res = await submitPayment({
      channel,
      payment_method: method,
    });
    window.loadJokulCheckout(res.data?.payment_page);
  };

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
  return (
    <div>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-[#17a3b8] px-[4vw] py-10">
        <div className="flex flex-col items-start justify-start gap-1">
          <div className="flex items-center justify-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#f5f7fb]">Pembayaran</h1>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-xs font-normal text-[#f5f7fb]">
              Silakan pilih metode untuk pembayaran uang pangkal kamu
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-[4vw] py-28">
        <p className="text-lg font-extrabold text-black">
          Pembayaran Uang Pangkal
        </p>
        <p className="mt-5 text-lg font-medium text-black">Informasi Anggota</p>
        <div className="mt-5 flex gap-4">
          <TextField
            className="w-full"
            label="Nama Anggota"
            value={auth?.name}
            readOnly
            startIcon={
              <UserIcon className="text-primary-500" width={24} height={24} />
            }
          />
          <TextField
            className="w-full"
            label="Email"
            value={auth?.email}
            readOnly
            startIcon={
              <EmailIcon className="text-primary-500" width={24} height={24} />
            }
          />
          <TextField
            className="w-full"
            label="Nomor Handphone"
            value={auth?.phoneNumber}
            readOnly
            startIcon={
              <PhoneIcon className="text-primary-500" width={24} height={24} />
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
                <div className="flex px-3 py-2">
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
                        className="text-sm font-normal text-black"
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
