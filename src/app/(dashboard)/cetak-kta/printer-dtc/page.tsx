"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import PrinterDTC from "../components/screens/printer-dtc";

const Page: FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/cetak-kta");
  };

  return <PrinterDTC onBack={handleBack} />;
};

export default Page;