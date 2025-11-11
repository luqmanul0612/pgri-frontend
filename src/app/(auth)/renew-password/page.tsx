"use client";
import useAuth from "@/store/useAuth";
import { useState } from "react";
import RenewPasswordForm from "./components/renew-password-form";
import RenewPasswordDone from "./components/renew-password-done";

export default function AccountValidation() {
  const { auth } = useAuth();
  const [step, setStep] = useState<"FORM" | "DONE">("FORM");
  
  return (
    <>
    {step === "FORM" && <RenewPasswordForm step={step} setStep={setStep} />}
    {step === "DONE" && <RenewPasswordDone />}
    </>
  );
}
