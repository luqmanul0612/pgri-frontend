"use client";
import { FC, useEffect, useState } from "react";
import FormComponent from "./components/form";
import Stepper from "./components/stepper";
import { Footer } from "@/app/components/Footer";
import Header from "./components/header";
import PasswordForm from "./components/passwordForm";
import { DataPekerjaan } from "./components/dataPekerjaan";
import UangPangkal from "./components/uangPangkal";

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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    nik: "",
    email: "",
    birth_place: "",
    dob: "",
    gender: "",
    relegion: "",
    blood_type: "",
    phone_number: "",
    address: "",
    postal_code: "",
    latest_education: "",
    password: "",
  });

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-5 py-28">
        <Stepper step={step} setStep={setStep} />
        {step === 1 && (
          <FormComponent
            formData={formData}
            setStep={setStep}
            setFormData={setFormData}
          />
        )}
        {step === 2 && (
          <PasswordForm
            formData={formData}
            setStep={setStep}
            setFormData={setFormData}
          />
        )}
        {step === 3 && (
          <DataPekerjaan
            formData={formData}
            setStep={setStep}
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <UangPangkal
            formData={formData}
            setStep={setStep}
            setFormData={setFormData}
          />
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
