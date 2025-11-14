/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useValidationForm } from "./utils/use-validation-form";
import ValidationConfirm from "./components/validation-confirm";
import ValidationForm from "./components/validation-form";
import ValidationDone from "./components/validation-done";
import useAuth from "@/store/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountValidation() {
  const router = useRouter();
  const { step } = useValidationForm();
  const { user } = useAuth();

  useEffect(() => {
    if (user.is_verified) {
      router.push("/dashboard");
    }
  }, [user.is_verified]);
  
  return (
    <>
    {step === "CONFIRM" && <ValidationConfirm />}
    {step === "FORM" && <ValidationForm />}
    {step === "DONE" && <ValidationDone />}
    </>
  );
}
