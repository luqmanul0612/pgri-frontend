"use client";
import { FC, useState } from "react";
import FormComponent from "./components/form";
import Stepper from "./components/stepper";
import { Footer } from "@/app/components/Footer";
import Header from "./components/header";
import PasswordForm from "./components/passwordForm";
import { DataPekerjaan } from "./components/dataPekerjaan";
import UangPangkal from "./components/uangPangkal";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";

export interface IFormData {
  name: string;
  nik: string;
  email: string;
  birth_place: string;
  dob: string;
  gender: string;
  relegion: string;
  blood_type: string;
  phone_number: string;
  address: string;
  postal_code: string;
  latest_education: string;
  password?: string;
}

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
        {step === 2 && (
          <PasswordForm formData={formData} setFormData={setFormData} />
        )}
        {step === 3 && (
          <DataPekerjaan formData={formData} setFormData={setFormData} />
        )}
        {step === 4 && (
          <UangPangkal formData={formData} setFormData={setFormData} />
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
