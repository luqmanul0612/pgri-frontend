import Button from "@/components/customs/button";
import Datepicker from "@/components/customs/datepicker";
import TextField from "@/components/customs/textfield";
import Select from "@/components/customs/select";
import Required from "@/components/customs/required";
import { Controller, useForm, useWatch } from "react-hook-form";
import useMutation from "@/utils/hooks/use-mutation";
import { postUpdatePassword } from "../../serverActions/post-renew-password";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UpdatePasswordForm,
  updatePasswordValidationSchema,
} from "../../utils/validation-schema";
import { FC } from "react";
import { toast } from "sonner";
import Danger from "../../assets/danger.svg";
import Checkbox from "@/components/customs/checkbox";

const defaultValues: UpdatePasswordForm = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
  isAgreed: false,
};

interface Props {
  step: string;
  setStep: (step: "FORM" | "DONE") => void;
}

const RenewPasswordForm: FC<Props> = ({ setStep, step }) => {
  const form = useForm<UpdatePasswordForm>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(updatePasswordValidationSchema),
  });

  const values = useWatch({ control: form.control });

  const updatePassword = useMutation({
    mutationFn: postUpdatePassword,
    onSuccess: () => {
      toast.success("Data berhasil disimpan");
      setStep("DONE");
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    updatePassword.mutate({
      oldPassword: values.oldPassword,
      newPassword: values.password,
    });
  });

  return (
    <form
      className="flex min-h-dvh flex-col items-center bg-slate-200 justify-stretch"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col items-center gap-2 bg-primary-500 p-[10px]">
        <p className="text-[24px] font-bold text-white">Perbarui Kata Sandi</p>
        <p className="text-[12px] font-normal text-white">
          PGRI menyarankan Anggota untuk merubah Kata Sandi Default dengan kata
          sandi baru
        </p>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center py-[40px]">
        <div className="flex w-full max-w-[500px] flex-col items-start justify-center gap-6 rounded-2xl border border-[#17a3b8]/20 bg-white p-4">
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-[18px] font-bold text-slate-900">
                Perbarui Kata Sandi
              </h2>
              <p className="self-stretch text-xs font-normal text-slate-600">
                Kata Sandi yang dibuat akan digunakan untuk mengkases aplikasi
                Mobile PGRIKU, diharapkan untuk membuat kata sandi yang mudah di
                ingat! Pastikan kata sandi terdiri dari Huruf Besar, Kecil,
                Simbol dan Angka. Contoh:{" "}
                <span className="text-primary-500">Sandiku@123</span>
              </p>
            </div>
            <div className="flex w-full items-center gap-2 rounded-[8px] bg-red-50 px-2 py-1 text-[10px] text-red-500">
              <Danger />
              Pastikan kamu mengingat atau menyimpan Kata Sandi yang telah
              dibuat!
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <Controller
                control={form.control}
                name="oldPassword"
                render={({ field, fieldState }) => (
                  <TextField
                    label={<Required>Default Kata Sandi</Required>}
                    placeholder="Masukkan Kata Sandi"
                    type="password"
                    className="w-full"
                    onChange={field.onChange}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <TextField
                    label={<Required>Kata Sandi Baru</Required>}
                    placeholder="Masukkan Kata Sandi"
                    type="password"
                    className="w-full"
                    onChange={field.onChange}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <TextField
                    label={<Required>Ulangi Kata Sandi Baru</Required>}
                    placeholder="Masukkan Kata Sandi"
                    type="password"
                    className="w-full"
                    onChange={field.onChange}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="flex w-full items-center justify-center gap-3">
              <Controller
                control={form.control}
                name="isAgreed"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                )}
              />
              <p className="text-[12px] font-normal text-slate-600">
                Dengan ini saya bersedia menjadi Anggota PGRI, menaati AD/ART
                PGRI, memberikan hak pengelolaan dan perlindungan data sesuai UU
                Perlindungan data pribadi.{" "}
                <span className="cursor-pointer font-bold text-[#17a3b8] underline">
                  Hak dan kewajiban anggota
                </span>
              </p>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <Button
              type="button"
              fullWidth
              variant="secondary"
              disabled={updatePassword.isPending}
            >
              Kembali
            </Button>
            <Button
              fullWidth
              type="submit"
              disabled={!values.isAgreed}
              isLoading={updatePassword.isPending}
            >
              Buat Kata Sandi
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RenewPasswordForm;
