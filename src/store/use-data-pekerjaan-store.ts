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

        Object.entries(formData).map((item) => {
          if (
            (!item[1] && item[0] != "educator_certificate") ||
            (item[1] === undefined && item[0] == "educator_certificate")
          ) {
            toast.error(`Anda belum mengisi data: ${item[0]}`);
            return;
          }
        });

        try {
          const response = await submitDataPekerjaan(formData);
          console.log({ response });
          if (response && response.success) {
            toast.success("Berhasil simpan data");
            setStep(4);
          } else if (response?.status === 401) {
            toast.error("Unauthorized: Silakan login kembali.");
          } else if (response?.status === 400) {
            toast.error(
              response?.error?.message || "Bad Request: Data tidak valid.",
            );
          } else {
            toast.error(response?.error?.message || "Gagal simpan data");
          }
        } catch (error) {
          console.error("error saat kirim data", error);
          toast.error("Terjadi kesalahan saat mengirim data");
        }
      },
    }),
    {
      name: "form-pekerjaan-storage",
      partialize: (state) => ({ formData: state.formData }),
    },
  ),
);
