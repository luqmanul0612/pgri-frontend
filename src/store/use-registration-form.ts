import { checkRegistrationData } from "@/app/(auth)/register/serverActions/checkData";
import { submitRegistration } from "@/app/(auth)/register/serverActions/submitRegistration";
import { IDataPekerjaan } from "@/interfaces/IDataPekerjaan";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAuth from "./useAuth";
import { TokenValue } from "@/app/(auth)/register/serverActions/payment";
import { decodeJwt } from "@/lib/utils";
import { setCookies } from "@/serverActions/setCookies";
import { removeEmptyFields } from "@/utils/remove-empty-fields";

export interface IUserFormData {
  name: string;
  nik: string;
  email: string;
  birth_place: string;
  dob: string;
  gender: string;
  religion: string;
  blood_type: string;
  phone_number: string;
  address: string;
  postal_code: string;
  latest_education: string;
}

export interface IPasswordFormData {
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
  isSubmited: boolean;
}

export type TRegisterFormData = IUserFormData &
  IDataPekerjaan &
  IPasswordFormData;

export type TPayloadRegister = IUserFormData & {
  institution: IDataPekerjaan;
  password: string;
};

interface FormStore {
  step: number;
  setStep: (step: number) => void;
  resetForm: () => void;
  isLoading: boolean;
  userFormData: IUserFormData;
  userJobFormData: IDataPekerjaan;
  passwordFormData: IPasswordFormData;
  errors: Partial<Record<keyof TRegisterFormData, string>>;
  updateField: (key: keyof TRegisterFormData, value: string | boolean) => void;
  handlerSubmitForm: () => Promise<void>;
}

const defaultUserForm: IUserFormData = {
  name: "",
  nik: "",
  email: "",
  birth_place: "",
  dob: "",
  gender: "",
  religion: "",
  blood_type: "",
  phone_number: "",
  address: "",
  postal_code: "",
  latest_education: "",
};

const defaultUserJobForm: IDataPekerjaan = {
  subdistrict_id: "",
  stage: "",
  job_title: "",
  name: "",
  address: "",
  employee_status: "",
  educator_certificate: undefined,
  grade: "",
  study_subjects: "",
};

const defaultPasswordForm: IPasswordFormData = {
  password: "",
  confirmPassword: "",
  isAgreed: false,
  isSubmited: false,
};

const handlerValidateUserForm = (
  get: () => FormStore,
  set: (partial: Partial<FormStore>) => void,
) => {
  const newErrors: Partial<Record<keyof IUserFormData, string>> = {};

  if (!/^\d{16}$/.test(get().userFormData.nik)) {
    newErrors.nik = "NIK harus 16 digit angka.";
  }

  if (!/^\d{10,15}$/.test(get().userFormData.phone_number)) {
    newErrors.phone_number =
      "Nomor telepon harus antara 10 hingga 15 digit angka.";
  }

  if (!/^\d{5}$/.test(get().userFormData.postal_code)) {
    newErrors.postal_code = "Kode pos harus 5 digit angka.";
  }

  set({ errors: newErrors });
  return Object.keys(newErrors).length === 0;
};

const handlerCheckUserForm = async (
  get: () => FormStore,
  set: (partial: Partial<FormStore>) => void,
) => {
  set({ isLoading: true });
  try {
    if (handlerValidateUserForm(get, set)) {
      const result = await checkRegistrationData(get().userFormData);
      if (result?.errors) {
        const errors = Array.isArray(result.errors)
          ? result.errors
          : [result.errors];

        errors.forEach((err) => toast.error(err));
        return false;
      }
      return true;
    } else {
      Object.entries(get().errors).forEach(([field, msg]) => {
        toast.error(`${field}: ${msg}`);
      });
      return false;
    }
  } finally {
    set({ isLoading: false });
  }
};

const validatePassword = (password: string) => {
  const hasNumber = /[0-9]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasNumber && hasLowerCase && hasUpperCase && hasSpecialChar;
};

const handlerValidatePassword = async (
  get: () => FormStore,
  set: (partial: Partial<FormStore>) => void,
) => {
  const password = get().passwordFormData.password;
  const confirmPassword = get().passwordFormData.confirmPassword;
  set({ isLoading: true });
  if (password !== confirmPassword) {
    set({
      isLoading: false,
      errors: { confirmPassword: "Kata sandi tidak sesuai." },
    });
    return false;
  } else if (password.length < 8) {
    set({
      isLoading: false,
      errors: { password: "Kata sandi minimal terdiri dari 8 karakter." },
    });
    return false;
  } else if (!validatePassword(get().passwordFormData.password)) {
    set({
      isLoading: false,
      errors: {
        password:
          "Kata sandi harus mengandung minimal 1 angka, 1 huruf kecil, 1 huruf kapital, dan 1 karakter khusus.",
      },
    });
    return false;
  } else {
    set({ errors: {} });
    return true;
  }
};

const handlerSubmitRegisterForm = async (
  get: () => FormStore,
  set: (partial: Partial<FormStore>) => void,
) => {
  const res = await submitRegistration({
    ...get().userFormData,
    password: get().passwordFormData.password,
    institution: removeEmptyFields(get().userJobFormData) as IDataPekerjaan,
  });

  if (res.errors) {
    toast.error(res.errors ?? res.errors[0]);
    set({ isLoading: false });
    return false;
  }
  if (res.data.token) {
    const token = res.data.token;
    setCookies("token", token);
    setCookies("auth", res.data);
    const tokenValue = decodeJwt<TokenValue>(token as string);
    useAuth.getState().setAuth({
      auth: {
        id: res?.data?.id,
        name: res?.data?.name,
        email: res?.data?.email,
        phoneNumber: res?.data?.phone_number,
        isVerified: !!tokenValue?.is_verified,
        levelId: tokenValue?.level_id ?? 3,
        createdAt: res?.data?.created_at,
        address: res?.data?.address,
        birthPlace: res?.data?.birth_place,
        bloodType: res?.data?.blood_type,
        dob: res?.data?.dob,
        gender: res?.data?.gender,
        latestEducation: res?.data?.latest_education,
        nik: res?.data?.nik,
        npaNumber: res?.data?.npa_number,
        postalCode: res?.data?.postal_code,
        religion: res?.data?.religion,
      },
    });
    set({
      isLoading: false,
      passwordFormData: { ...get().passwordFormData, isSubmited: true },
    });
  }
};

export const useRegistrationFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      step: 1,
      setStep: (step) => set({ step }),
      userFormData: defaultUserForm,
      userJobFormData: defaultUserJobForm,
      passwordFormData: defaultPasswordForm,
      errors: {},
      isLoading: false,
      resetForm: () => {
        set({
          step: 1,
          userFormData: defaultUserForm,
          userJobFormData: defaultUserJobForm,
          passwordFormData: defaultPasswordForm,
          errors: {},
          isLoading: false,
        });
      },
      updateField: (key, value) => {
        set((state) => ({
          userFormData:
            get().step === 1
              ? { ...state.userFormData, [key]: value }
              : state.userFormData,
          userJobFormData:
            get().step === 2
              ? { ...state.userJobFormData, [key]: value }
              : state.userJobFormData,
          passwordFormData:
            get().step === 3
              ? { ...state.passwordFormData, [key]: value }
              : state.passwordFormData,
          errors: { ...state.errors, [key]: undefined },
        }));
      },
      handlerSubmitForm: async () => {
        if (get().step === 1) {
          if (await handlerCheckUserForm(get, set)) {
            set({ step: 2 });
          }
        } else if (get().step === 2) {
          set({ step: 3 });
        } else if (get().step === 3) {
          if (await handlerValidatePassword(get, set)) {
            await handlerSubmitRegisterForm(get, set);
          }
        }
      },
    }),
    {
      name: "form-storage",
      partialize: (state) => {
        return {
          step: state.step,
          userFormData: state.userFormData,
          userJobFormData: state.userJobFormData,
          passwordFormData: {
            isSubmited: state.passwordFormData.isSubmited,
          },
        };
      },
    },
  ),
);
