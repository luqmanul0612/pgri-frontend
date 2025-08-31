"use client";
import { FC } from "react";
import Stepper from "./components/stepper";
import UserFormComponent from "./components/user-form";
import UserJobFormComponent from "./components/user-job-form";
import { Footer } from "@/app/components/Footer";
import Header from "./components/header";
import PasswordForm from "./components/password-form";
import InitialPayment from "./components/InitialPayment";
import { useRegistrationFormStore } from "@/store/use-registration-form";

interface PageProps {
  params: {};
}

const Page: FC<PageProps> = ({ params: {} }) => {
  const { step } = useRegistrationFormStore();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-5 py-28">
        <Stepper />
        {step === 1 && <UserFormComponent />}
        {step === 2 && <UserJobFormComponent />}
        {step === 3 && <PasswordForm />}
        {step === 4 && <InitialPayment />}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
