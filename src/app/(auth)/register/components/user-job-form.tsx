/* eslint-disable react-hooks/exhaustive-deps */
import Danger from "../../../../../public/assets/danger";
import Button from "@/components/customs/button";
import { Controller, set, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useRegistrationState, {
  UserJobData,
} from "../utils/use-registration-state";
import { userJobSchema } from "../utils/validation-schema";
import TextField from "@/components/customs/textfield";
import Required from "@/components/customs/required";
import Select from "@/components/customs/select";
import { useDebouncedCallback } from "@/utils/use-debounce-callback";
import { useEffect } from "react";
import useQuery from "@/utils/hooks/use-query";
import {
  getLocation,
  getServiceOptions,
} from "../serverActions/get-register-form-data";

const certificateOptions = [
  { key: 0, label: "Belum" },
  { key: 1, label: "Sudah" },
];

const UserJobForm = () => {
  const { saveDataForm, setStep } = useRegistrationState();

  const form = useForm<UserJobData>({
    mode: "all",
    defaultValues: useRegistrationState.getState().jobData,
    resolver: yupResolver(userJobSchema),
  });

  const values = useWatch({ control: form.control });

  const provinces = useQuery({
    queryFn: () => getLocation({ type: "provinces" }),
  });

  const cities = useQuery({
    queryKey: [values.provinceId],
    queryFn: () =>
      getLocation({ type: "cities", id: form.getValues("provinceId") }),
    enabled: !!values.provinceId,
  });

  const districts = useQuery({
    queryKey: [values.cityId],
    queryFn: () =>
      getLocation({ type: "districts", id: form.getValues("cityId") }),
    enabled: !!values.cityId,
  });

  const subDistricts = useQuery({
    queryKey: [values.districtId],
    queryFn: () =>
      getLocation({ type: "subdistricts", id: form.getValues("districtId") }),
    enabled: !!values.districtId,
  });

  const jobs = useQuery({
    queryFn: () => getServiceOptions("jobs"),
  });

  const employmentStatuses = useQuery({
    queryFn: () => getServiceOptions("employment-statuses"),
  });

  const stages = useQuery({
    queryFn: () => getServiceOptions("stages"),
  });

  const subjects = useQuery({
    queryFn: () => getServiceOptions("subjects"),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setStep(3);
    // mutate({
    //   name: values.name,
    //   subdistrict_id: Number(values.subDistrictId),
    //   address: values.address,
    //   job_id: Number(values.jobId),
    //   stage_id: values.stageId ? Number(values.stageId) : undefined,
    //   employment_status_id: values.employmentStatusId
    //     ? Number(values.employmentStatusId)
    //     : undefined,
    //   has_certification: values.hasCertification
    //     ? values.hasCertification === "1"
    //       ? true
    //       : false
    //     : undefined,
    //   grade: values.grade ? values.grade : undefined,
    //   subject_id: values.subjectId ? Number(values.subjectId) : undefined,
    // });
  });

  const saveDataFormCb = useDebouncedCallback((values: UserJobData) => {
    saveDataForm({ type: "jobData", data: values });
  }, 500);

  useEffect(() => {
    if (form.formState.isDirty) saveDataFormCb(values as UserJobData);
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
                label={<Required>Nama Instansi Tempat Tugas</Required>}
                placeholder="Masukkan Nama dan Gelar"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="provinceId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label={<Required>Provinsi Tempat Tugas</Required>}
                placeholder="Pilih Provinsi"
                options={provinces.data?.data || []}
                isLoading={provinces.isLoading}
                onChange={(v) => {
                  field.onChange(v);
                  form.setValue("cityId", "");
                  form.setValue("districtId", "");
                  form.setValue("subDistrictId", "");
                }}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="cityId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label={
                  <Required>
                    Provinsi Kabupatan/Kota/Kota Administrasi Tempat Tugas
                  </Required>
                }
                placeholder="Pilih Kabupaten/Kota/Kota Administrasi Tempat Tugas"
                options={cities.data?.data || []}
                isLoading={cities.isFetching}
                onChange={(v) => {
                  field.onChange(v);
                  form.setValue("districtId", "");
                  form.setValue("subDistrictId", "");
                }}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={!form.watch("provinceId")}
              />
            )}
          />
          <Controller
            control={form.control}
            name="districtId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label={
                  <Required>Kecamatan/Cabang/Distrik Tempat Tugas</Required>
                }
                placeholder="Pilih Kecamatan/Cabang/Distrik Tempat Tugas"
                options={districts.data?.data || []}
                isLoading={districts.isFetching}
                onChange={(v) => {
                  field.onChange(v);
                  form.setValue("subDistrictId", "");
                }}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={!form.watch("cityId")}
              />
            )}
          />
          <Controller
            control={form.control}
            name="subDistrictId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label={<Required>Desa/Kelurahan Tempat Tugas</Required>}
                placeholder="Pilih Desa/Kelurahan Tempat Tugas"
                options={subDistricts.data?.data || []}
                isLoading={subDistricts.isFetching}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={!form.watch("districtId")}
              />
            )}
          />
          <Controller
            control={form.control}
            name="address"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Alamat Tempat Tugas</Required>}
                placeholder="Masukkan Alamat Tempat Tugas"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="jobId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Pekerjaan"
                placeholder="Pilih Pekerjaan"
                options={jobs.data?.data || []}
                isLoading={jobs.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="employmentStatusId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Status Kepegawaian"
                placeholder="Pilih Status Kepegawaian"
                options={employmentStatuses?.data?.data || []}
                isLoading={employmentStatuses.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="grade"
            render={({ field, fieldState }) => (
              <TextField
                label="Pangkat/Golongan"
                placeholder="Pilih Pangkat/Golongan"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="hasCertification"
            render={({ field, fieldState }) => (
              <Select
                label="Sertifikat Pendidik"
                placeholder="Pilih Sertifikat Pendidik"
                options={certificateOptions}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="stageId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Jenjang Mengajar"
                placeholder="Pilih Jenjang Mengajar"
                options={stages.data?.data || []}
                isLoading={stages.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="subjectId"
            render={({ field, fieldState }) => (
              <Select
                getKey={(v) => v.id.toString()}
                getLabel={(v) => v.name}
                label="Mata Pelajaran"
                placeholder="Pilih Mata Pelajaran"
                options={subjects.data?.data || []}
                isLoading={subjects.isLoading}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
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
            onClick={() => {
              setStep(1);
            }}
          >
            Kembali
          </Button>

          <Button type="submit">Selanjutnya</Button>
        </div>
      </div>
    </form>
  );
};

export default UserJobForm;
