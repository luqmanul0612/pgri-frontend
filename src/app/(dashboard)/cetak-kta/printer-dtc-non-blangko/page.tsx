"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import PrinterDTCNonBlanko from "../components/screens/printer-dtc-non-blanko";

const Page: FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/cetak-kta");
  };

  return <PrinterDTCNonBlanko onBack={handleBack} />;
};

export default Page;