"use client";
import { useState } from "react";
import RenewPasswordForm from "./components/renew-password-form";
import RenewPasswordDone from "./components/renew-password-done";

export default function AccountValidation() {
  const [step, setStep] = useState<"FORM" | "DONE">("FORM");
  
  return (
    <>
    {step === "FORM" && <RenewPasswordForm step={step} setStep={setStep} />}
    {step === "DONE" && <RenewPasswordDone />}
    </>
  );
}
