"use client";
import { FC } from "react";
import FormComponent from "./components/form";
import Stepper from "./components/stepper";
import { Footer } from "@/app/components/Footer";
import Header from "./components/header";
import PasswordForm from "./components/passwordForm";
import { DataPekerjaan } from "./components/dataPekerjaan";
import UangPangkal from "./components/uangPangkal";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";

interface PageProps {
  params: {};
}

const Page: FC<PageProps> = ({ params: {} }) => {
  const { step } = useRegistrationStepStore();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-5 py-28">
        <Stepper />
        {step === 1 && <FormComponent />}
        {step === 2 && <PasswordForm />}
        {step === 3 && <DataPekerjaan />}
        {step === 4 && <UangPangkal />}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
