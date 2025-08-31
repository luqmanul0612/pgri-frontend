import { useRegistrationFormStore } from "@/store/use-registration-form";
import React, { Dispatch, SetStateAction } from "react";

const Stepper = () => {
  const { step, setStep } = useRegistrationFormStore();
  return (
    <div className="inline-flex h-[34px] w-[900px] items-center justify-between">
      <Step
        number={1}
        label="Data Pribadi"
        active={step >= 1}
        setStep={setStep}
        step={step}
      />
      <Separator />
      <Step
        number={2}
        label="Data Pekerjaan"
        active={step >= 2}
        setStep={setStep}
        step={step}
      />
      <Separator />
      <Step
        number={3}
        label="Buat Kata Sandi"
        active={step >= 3}
        setStep={setStep}
        step={step}
      />
      <Separator />
      <Step
        number={4}
        label="Uang Pangkal"
        active={step == 4}
        setStep={setStep}
        step={step}
      />
    </div>
  );
};

interface StepProps {
  number: number;
  label: string;
  active?: boolean;
  setStep: (step: number) => void;
  step: number;
}

const Step: React.FC<StepProps> = ({
  number,
  label,
  active = false,
  setStep,
  step,
}) => (
  <div
    className="flex items-center gap-2.5"
    onClick={() => {
      if (step == 1 || step == 3) return;
      setStep(number);
    }}
  >
    <div
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[30px] p-2.5 ${
        active ? "bg-[#17a3b8]" : "bg-[#919191]"
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
        active ? "font-bold text-[#17a3b8]" : "font-normal text-[#919191]"
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
