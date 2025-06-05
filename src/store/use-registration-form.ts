import { checkRegistrationData } from "@/app/(auth)/register/serverActions/checkData";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IFormData {
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
  password?: string;
}

interface FormStore {
  formData: IFormData;
  errors: Partial<Record<keyof IFormData, string>>;
  updateField: (key: keyof IFormData, value: string) => void;
  validateForm: () => boolean;
  sendFormForCheck: () => Promise<{ success: boolean }>;
  submitForm: (passwordConfirmation: string) => Promise<{ success: boolean }>;
}

const defaultForm: IFormData = {
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
  password: "",
};

export const useRegistrationFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      formData: defaultForm,
      errors: {},
      updateField: (key, value) => {
        set((state) => ({
          formData: { ...state.formData, [key]: value },
          errors: { ...state.errors, [key]: undefined },
        }));
      },
      validateForm: () => {
        const newErrors: Partial<Record<keyof IFormData, string>> = {};

        if (!/^\d{16}$/.test(get().formData.nik)) {
          newErrors.nik = "NIK harus 16 digit angka.";
        }

        if (!/^\d{10,15}$/.test(get().formData.phone_number)) {
          newErrors.phone_number =
            "Nomor telepon harus antara 10 hingga 15 digit angka.";
        }

        if (!/^\d{5}$/.test(get().formData.postal_code)) {
          newErrors.postal_code = "Kode pos harus 5 digit angka.";
        }

        set({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
      },
      sendFormForCheck: async () => {
        if (get().validateForm()) {
          const result = await checkRegistrationData(get().formData);
          if (result?.errors) {
            toast.error(result.errors ?? result.errors[0]);
            return { success: false };
          }
          return { success: true };
        } else {
          Object.entries(get().errors).forEach(([field, msg]) => {
            toast.error(`${field}: ${msg}`);
          });
          return { success: false };
        }
      },
      submitForm: async () => {
        return { success: true };
      },
    }),
    {
      name: "form-storage",
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
);
