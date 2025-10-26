import { useRegistrationFormStore } from "@/store/use-registration-form";
import React, { Dispatch, SetStateAction } from "react";
import useRegistrationState from "../utils/use-registration-state";

const Stepper = () => {
  const { step } = useRegistrationState();
  return (
    <div className="inline-flex h-[34px] w-[900px] items-center justify-between">
      <Step number={1} label="Data Pribadi" active={step >= 1} step={step} />
      <Separator />
      <Step number={2} label="Data Pekerjaan" active={step >= 2} step={step} />
      <Separator />
      <Step number={3} label="Buat Kata Sandi" active={step >= 3} step={step} />
      <Separator />
      <Step number={4} label="Uang Pangkal" active={step == 4} step={step} />
    </div>
  );
};

interface StepProps {
  number: number;
  label: string;
  active?: boolean;
  step: number;
}

const Step: React.FC<StepProps> = ({ number, label, active = false, step }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[30px] p-2.5 ${
        active ? "bg-primary-500" : "bg-slate-400"
      } transition-colors duration-300`}
    >
      <div
        className={`text-center text-base ${
          active ? "font-bold" : "font-normal"
        } text-[#f5f7fb] transition-all duration-300`}
      >
        {number}
      </div>
    </div>
    <div
      className={`text-sm ${
        active ? "font-bold text-primary-500" : "font-normal text-slate-400"
      } transition-colors duration-300`}
    >
      {label}
    </div>
  </div>
);

const Separator: React.FC = () => (
  <div className="h-[0px] w-[90px] border border-[#17a3b8]"></div>
);

export default Stepper;
