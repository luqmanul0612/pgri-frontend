/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useVerificationForm } from "./utils/use-verification-form";
import VerificationConfirm from "./components/verification-confirm";
import VerificationForm from "./components/verification-form";
import VerificationDone from "./components/verification-done";
import { useRouter } from "next/navigation";
import useAuth from "@/store/useAuth";
import { useEffect } from "react";

export default function AccountVerification() {
  const { step } = useVerificationForm();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user.is_verified) {
      router.push("/dashboard");
    }
  }, [user.is_verified]);
  
  return (
    <>
    {step === "CONFIRM" && <VerificationConfirm />}
    {step === "FORM" && <VerificationForm />}
    {step === "DONE" && <VerificationDone />}
    </>
  );
}
