"use client";
import { FC } from "react";
import Stepper from "./components/stepper";
import { Footer } from "@/app/components/Footer";
import Header from "./components/header";
import PasswordForm from "./components/password-form";
import InitialPayment from "./components/InitialPayment";
import useRegistrationState from "./utils/use-registration-state";
import dynamic from "next/dynamic";

const UserFormComponent = dynamic(() => import("./components/user-form"), {
  ssr: false,
});

const UserJobFormComponent = dynamic(
  () => import("./components/user-job-form"),
  { ssr: false },
);

interface PageProps {
  params: {};
}

const Page: FC<PageProps> = ({ params: {} }) => {
  const { step } = useRegistrationState();

  return (
    <div>
      <Header />
      <div className="box-border flex min-h-dvh flex-col items-center gap-6 bg-slate-100 px-2 py-28">
        <Stepper />
        <div className="fle-col w-full flex h-full justify-center items-center flex-grow">
          {step === 1 && <UserFormComponent />}
          {step === 2 && <UserJobFormComponent />}
          {step === 3 && <PasswordForm />}
          {step === 4 && <InitialPayment />}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
