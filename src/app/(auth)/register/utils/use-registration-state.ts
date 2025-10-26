"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserFormData {
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
}

export interface UserJobData {
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
}

export interface UserPasswordData {
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
}

export interface AuthRegisterData {
  id: number | string;
  name: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  levelId: number;
  createdAt: string;
  address: string;
  birthPlace: string;
  bloodType: string;
  dob: string;
  gender: string;
  latestEducation: string;
  nik: string;
  npaNumber: string;
  postalCode: string;
  religion: string;
}

export interface RegistrationState {
  step: number;
  isSubmited: boolean;
  auth: AuthRegisterData;
  userData: UserFormData;
  jobData: UserJobData;
}

interface RegistrationStateProps extends RegistrationState {
  saveDataForm: (value: SaveDataType) => void;
  setStep: (step: number) => void;
  setAuth: (auth: AuthRegisterData) => void;
  setIsSubmited: () => void;
  resetRegisterState: () => void;
}

type SaveDataType =
  | { type: "userData"; data: UserFormData }
  | {
      type: "jobData";
      data: UserJobData;
    };

export const defaultValues: RegistrationState = {
  step: 1,
  isSubmited: false,
  userData: {
    name: "",
    nik: "",
    email: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    religionId: "",
    bloodTypeId: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    latestEducationId: "",
  },
  auth: {} as AuthRegisterData,
  jobData: {
    provinceId: "",
    cityId: "",
    districtId: "",
    subDistrictId: "",
    stageId: "",
    jobId: "",
    name: "",
    address: "",
    grade: "",
    subjectId: "",
    employmentStatusId: "",
    hasCertification: "",
  },
};

const useRegistrationState = create<RegistrationStateProps>()(
  persist(
    (set, get) => ({
      hydrated: true,
      isSubmited: false,
      step: defaultValues.step,
      auth: defaultValues.auth,
      setStep: (step) => set({ step }),
      setIsSubmited: () => {
        set({ ...get(), isSubmited: true });
      },
      userData: defaultValues.userData,
      jobData: defaultValues.jobData,
      setAuth: (auth) => set({ auth }),
      saveDataForm: (values) => {
        if (values.type === "userData")
          set({ ...get(), userData: values.data });
        else if (values.type === "jobData")
          set({ ...get(), jobData: values.data });
      },
      resetRegisterState: () => set(defaultValues),
    }),
    {
      name: "register-form",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        auth: state.auth,
        userData: state.userData,
        jobData: state.jobData,
      }),
    },
  ),
);

export default useRegistrationState;
