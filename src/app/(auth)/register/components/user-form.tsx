/* eslint-disable react-hooks/exhaustive-deps */
import Danger from "../../../../../public/assets/danger";
import { useRouter } from "next/navigation";
import Button from "@/components/customs/button";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegistrationState, {
  UserFormData,
} from "../utils/use-registration-state";
import { userSchema } from "../utils/validation-schema";
import TextField from "@/components/customs/textfield";
import Required from "@/components/customs/required";
import Datepicker from "@/components/customs/datepicker";
import dayjs from "dayjs";
import Select from "@/components/customs/select";
import { NumericFormat } from "react-number-format";
import { useDebouncedCallback } from "@/utils/use-debounce-callback";
import { useEffect } from "react";
import useMutation from "@/utils/hooks/use-mutation";
import { postAuthCheck } from "../serverActions/post-auth-check";
import { toast } from "sonner";
import useQuery from "@/utils/hooks/use-query";
import { getServiceOptions } from "../serverActions/get-register-form-data";

const genderOptions = [
  { key: "M", label: "Laki-Laki" },
  { key: "P", label: "Perempuan" },
];

const UserForm = () => {
  const router = useRouter();
  const { saveDataForm, setStep } = useRegistrationState();

  const form = useForm<UserFormData>({
    mode: "all",
    defaultValues: useRegistrationState.getState().userData,
    resolver: yupResolver(userSchema),
  });

  const values = useWatch({ control: form.control });

  const { isPending, mutate } = useMutation({
    mutationFn: postAuthCheck,
    onSuccess: () => {
      setStep(2);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });

  const bloodTypes = useQuery({
    queryFn: () => getServiceOptions("blood-types"),
  });

  const educations = useQuery({
    queryFn: () => getServiceOptions("educations"),
  });

  const religions = useQuery({
    queryFn: () => getServiceOptions("religions"),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    mutate({
      name: values.name,
      nik: values.nik,
      email: values.email,
      birth_place: values.birthPlace,
      birth_date: dayjs(values.birthDate).format("YYYY-MM-DD"),
      phone_number: values.phoneNumber,
      gender: values.gender ? values.gender : undefined,
      religion_id: values.religionId ? Number(values.religionId) : undefined,
      blood_type_id: values.bloodTypeId
        ? Number(values.bloodTypeId)
        : undefined,
      address: values.address ? values.address : undefined,
      postal_code: values.postalCode ? values.postalCode : undefined,
      latest_education_id: values.latestEducationId
        ? Number(values.latestEducationId)
        : undefined,
    });
  });

  const saveDataFormCb = useDebouncedCallback((values: UserFormData) => {
    saveDataForm({ type: "userData", data: values });
  }, 500);

  useEffect(() => {
    if (form.formState.isDirty) saveDataFormCb(values as UserFormData);
  }, [values, form.formState.isDirty]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[1048px] flex-col items-start justify-center gap-6 rounded-2xl border border-[#17a3b8]/20 bg-white p-4"
    >
      <div className="flex w-full items-center gap-2 rounded-[8px] bg-red-50 px-2 py-1 text-[10px] text-red-500">
        <Danger />
        Form dengan tanda (*) bintang wajib di isi, untuk form tanpa tanda (*)
        bintang bisa dilewati untuk mempercepat proses registrasi.
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Nama & Gelar</Required>}
                placeholder="Masukkan Nama & Gelar"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="nik"
            render={({ field, fieldState }) => (
              <NumericFormat
                label={<Required>NIK (Nomor Induk Kependudukan)</Required>}
                placeholder="Masukkan NIK"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                customInput={TextField}
                allowLeadingZeros
                maxLength={16}
              />
            )}
          />
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Email</Required>}
                placeholder="Masukkan Email"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="birthPlace"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Tempat Lahir</Required>}
                placeholder="Masukkan Tempat Lahir"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <Datepicker
                label={<Required>Tanggal Lahir</Required>}
                onChange={(value) => field.onChange(value.toISOString())}
                value={field.value ? dayjs(field.value) : undefined}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                maxDate={dayjs(new Date())}
              />
            )}
          />
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <NumericFormat
                label={<Required>Nomor Handphone</Required>}
                placeholder="Masukkan Nomor Handphone"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                customInput={TextField}
                maxLength={15}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="gender"
            render={({ field, fieldState }) => (
              <Select
                label="Jenis Kelamin"
                placeholder="Pilih Jenis Kelamin"
                options={genderOptions}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="latestEducationId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Pendidikan/Ijazah Terakhir"
                placeholder="Pilih Pendidikan/Ijazah Terakhir"
                options={educations.data?.data || []}
                isLoading={educations.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="religionId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Agama"
                placeholder="Pilih Agama"
                options={religions?.data?.data || []}
                isLoading={religions.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="bloodTypeId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Golongan Darah"
                placeholder="Pilih Golongan Darah"
                options={bloodTypes.data?.data || []}
                isLoading={bloodTypes.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState }) => (
              <TextField
                label="Alamat KTP"
                placeholder="Masukkan Alamat Sesuai KTP"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="postalCode"
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Kode Pos"
                placeholder="Masukkan Kode Pos"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                customInput={TextField}
                maxLength={5}
              />
            )}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end">
        <div className="flex gap-4">
          <Button
            variant="secondary"
            type="button"
            disabled={isPending}
            onClick={() => {
              router.push("/login");
            }}
          >
            Kembali
          </Button>

          <Button type="submit" isLoading={isPending}>
            Selanjutnya
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
