"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import PrinterNonDTC from "../components/screens/printer-non-dtc";

const Page: FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/cetak-kta");
  };

  return <PrinterNonDTC onBack={handleBack} />;
};

export default Page;