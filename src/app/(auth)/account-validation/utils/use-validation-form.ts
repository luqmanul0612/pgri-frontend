import { create } from "zustand";

interface ValidationFormState {
  step: "CONFIRM" | "FORM" | "DONE";
  setStep: (step: ValidationFormState["step"]) => void;
}
export const useValidationForm = create<ValidationFormState>((set) => ({
  step: "CONFIRM",
  setStep: (step) => set({ step }),
}));

export interface UserValidationForm {
  user: {
    name: string;
    nik: string;
    email: string;
    birthPlace: string;
    birthDate: string;
    gender: string;
    religionId: string;
    bloodTypeId: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    latestEducationId: string;
  };
  userJob: {
    provinceId: string;
    cityId: string;
    districtId: string;
    subDistrictId: string;
    stageId: string;
    jobId: string;
    name: string;
    address: string;
    employmentStatusId: string;
    hasCertification: string;
    grade: string;
    subjectId: string;
  };
}
