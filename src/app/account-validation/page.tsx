"use client";
import { useValidationForm } from "./utils/use-validation-form";
import ValidationConfirm from "./components/validation-confirm";
import ValidationForm from "./components/validation-form";
import ValidationDone from "./components/validation-done";

export default function ValidationVerification() {
  const { step } = useValidationForm();
  return (
    <>
    {step === "CONFIRM" && <ValidationConfirm />}
    {step === "FORM" && <ValidationForm />}
    {step === "DONE" && <ValidationDone />}
    </>
  );
}
