// file: @/store/useFormPekerjaanStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IDataPekerjaan } from "@/interfaces/IDataPekerjaan";
import { useRegistrationStepStore } from "./use-registration-step-store";
import { submitDataPekerjaan } from "@/app/(auth)/register/serverActions/submitDataPekerjaan";
import { toast } from "sonner";

interface FormPekerjaanState {
  formData: IDataPekerjaan;
  setFormData: (data: Partial<IDataPekerjaan>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isFormIncomplete: () => boolean;
}

export const useFormPekerjaanStore = create<FormPekerjaanState>()(
  persist(
    (set, get) => ({
      formData: {
        subdistrict_id: "",
        stage: "",
        job_title: "",
        name: "",
        address: "",
        employee_status: "",
        educator_certificate: undefined,
        grade: "",
        study_subjects: "",
      },
      setFormData: (data) => set({ formData: { ...get().formData, ...data } }),
      handleSubmit: async (event) => {
        event.preventDefault();
        const { formData } = get();
        const { setStep } = useRegistrationStepStore.getState();

        let incomplete = false;
        Object.entries(formData).forEach((item) => {
          if (
            (!item[1] && item[0] != "educator_certificate") ||
            (item[1] === undefined && item[0] == "educator_certificate")
          ) {
            toast.error(`Anda belum mengisi data: ${item[0]}`);
            incomplete = true;
          }
        });
        if (incomplete) return;

        const toastId = toast.loading("Menyimpan data...");
        try {
          const response = await submitDataPekerjaan(formData);
          console.log({ response });
          if (response && response.success) {
            toast.success("Berhasil simpan data", { id: toastId });
            setStep(4);
          } else if (response?.status === 401) {
            toast.error("Unauthorized: Silakan login kembali.", {
              id: toastId,
            });
          } else if (response?.status === 400) {
            toast.error(
              response?.error?.message || "Bad Request: Data tidak valid.",
              { id: toastId },
            );
          } else {
            toast.error(response?.error?.message || "Gagal simpan data", {
              id: toastId,
            });
          }
        } catch (error) {
          console.error("error saat kirim data", error);
          toast.error("Terjadi kesalahan saat mengirim data", { id: toastId });
        }
      },
      isFormIncomplete: () => {
        const { formData } = get();
        return Object.entries(formData).some(
          ([key, value]) =>
            (key !== "educator_certificate" && !value) ||
            (key === "educator_certificate" && value === undefined),
        );
      },
    }),
    {
      name: "form-pekerjaan-storage",
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
);
