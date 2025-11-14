import Button from "@/components/customs/button";
import {
  UserValidationForm,
  useValidationForm,
} from "../../utils/use-validation-form";
import Datepicker from "@/components/customs/datepicker";
import TextField from "@/components/customs/textfield";
import Select from "@/components/customs/select";
import Required from "@/components/customs/required";
import useQuery from "@/utils/hooks/use-query";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  getUsersFormData,
} from "../../serverActions/get-form-data";
import { toast } from "sonner";
import {
  getLocation,
  getServiceOptions,
} from "@/app/(auth)/register/serverActions/get-register-form-data";
import useMutation from "@/utils/hooks/use-mutation";
import {
  postUpdateUser,
  postUpdateUserInstitution,
} from "../../serverActions/post-validate-user";
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidationSchema } from "../../utils/validation-schema";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

const genderOptions = [
  { key: "M", label: "Laki-Laki" },
  { key: "F", label: "Perempuan" },
];

const certificateOptions = [
  { key: "0", label: "Belum" },
  { key: "1", label: "Sudah" },
];

const defaultValues: UserValidationForm = {
  user: {
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
  userJob: {
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

const ValidationForm = () => {
  const { setStep } = useValidationForm();

  const form = useForm<UserValidationForm>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(userValidationSchema),
  });

  const values = useWatch({ control: form.control });

  const userFormData = useQuery({
    queryFn: getUsersFormData,
    onSuccess: (res) => {
      form.reset({
        user: {
          name: res.data.user.name,
          email: res.data.user.email,
          nik: res.data.user.nik,
          address: res.data.user.address,
          birthDate: res.data.user.birth_date,
          birthPlace: res.data.user.birth_place,
          bloodTypeId: String(res.data.user.blood_type_id),
          gender: res.data.user.gender,
          latestEducationId: String(res.data.user.latest_education_id),
          phoneNumber: res.data.user.phone_number,
          postalCode: res.data.user.postal_code,
          religionId: String(res.data.user.religion_id),
        },
        userJob: {
          name: res.data.institution.name,
          address: res.data.institution.address,
          provinceId: res.data.institution.province_id
            ? String(res.data.institution.province_id)
            : "",
          cityId: res.data.institution.city_id
            ? String(res.data.institution.city_id)
            : "",
          districtId: res.data.institution.district_id
            ? String(res.data.institution.district_id)
            : "",
          subDistrictId: res.data.institution.subdistrict_id
            ? String(res.data.institution.subdistrict_id)
            : "",
          stageId: res.data.institution.stage_id
            ? String(res.data.institution.stage_id)
            : "",
          jobId: res.data.institution.job_id
            ? String(res.data.institution.job_id)
            : "",
          grade: res.data.institution.grade || "",
          subjectId: res.data.institution.subject_id
            ? String(res.data.institution.subject_id)
            : "",
          employmentStatusId: res.data.institution.employment_status_id
            ? String(res.data.institution.employment_status_id)
            : "",
          hasCertification:
            res.data.institution.educator_certificate !== null
              ? res.data.institution.educator_certificate
                ? "1"
                : "0"
              : "",
        },
      });
    },
  });

  const bloodTypes = useQuery({
    queryFn: () => getServiceOptions("blood-types"),
  });

  const educations = useQuery({
    queryFn: () => getServiceOptions("educations"),
  });

  const religions = useQuery({ queryFn: () => getServiceOptions("religions") });

  const provinces = useQuery({
    queryFn: () => getLocation({ type: "provinces" }),
  });

  const cities = useQuery({
    queryKey: [values.userJob?.provinceId],
    queryFn: () =>
      getLocation({
        type: "cities",
        id: form.getValues("userJob.provinceId"),
      }),

    enabled: !!values.userJob?.provinceId && !!provinces.data?.data?.length,
  });

  const districts = useQuery({
    queryKey: [values.userJob?.cityId],
    queryFn: () =>
      getLocation({ type: "districts", id: form.getValues("userJob.cityId") }),
    enabled: !!values.userJob?.cityId && !!cities.data?.data?.length,
  });

  const subDistricts = useQuery({
    queryKey: [values.userJob?.districtId],
    queryFn: () =>
      getLocation({ type: "subdistricts", id: values.userJob?.districtId }),
    enabled: !!values.userJob?.districtId && !!districts.data?.data?.length,
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

  const updateInstitution = useMutation({
    mutationFn: postUpdateUserInstitution,
    onSuccess: () => {
      toast.success("Data berhasil disimpan");
      setStep("DONE");
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });

  const updateUser = useMutation({
    mutationFn: postUpdateUser,
    onSuccess: () => {
      const values = form.getValues();
      updateInstitution.mutate({
        name: values.userJob.name,
        subdistrict_id: values.userJob.subDistrictId
          ? Number(values.userJob.subDistrictId)
          : undefined,
        address: values.userJob.address,
        job_id: values.userJob.jobId ? Number(values.userJob.jobId) : undefined,
        stage_id: values.userJob.stageId
          ? Number(values.userJob.stageId)
          : undefined,
        employment_status_id: values.userJob.employmentStatusId
          ? Number(values.userJob.employmentStatusId)
          : undefined,
        has_certification: values.userJob.hasCertification
          ? values.userJob.hasCertification === "1"
            ? true
            : false
          : undefined,
        grade: values.userJob.grade ? values.userJob.grade : undefined,
        subject_id: values.userJob.subjectId
          ? Number(values.userJob.subjectId)
          : undefined,
      });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    updateUser.mutate({
      name: values.user.name,
      nik: values.user.nik,
      email: values.user.email,
      birth_place: values.user.birthPlace,
      birth_date: dayjs(values.user.birthDate).format("YYYY-MM-DD"),
      phone_number: values.user.phoneNumber,
      gender: values.user.gender ? values.user.gender : undefined,
      religion_id: values.user.religionId
        ? Number(values.user.religionId)
        : undefined,
      blood_type_id: values.user.bloodTypeId
        ? Number(values.user.bloodTypeId)
        : undefined,
      address: values.user.address ? values.user.address : undefined,
      postal_code: values.user.postalCode ? values.user.postalCode : undefined,
      latest_education_id: values.user.latestEducationId
        ? Number(values.user.latestEducationId)
        : undefined,
    });
  });

  return (
    <form
      className="flex min-h-dvh flex-col items-center bg-slate-200"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col items-center gap-2 bg-primary-500 p-[10px]">
        <p className="text-[24px] font-bold text-white">
          Validasi Data Diri dan Pekerjaan
        </p>
        <p className="text-[12px] font-normal text-white">
          Lakukan validasi sekarang untuk membuka akses terbatasmu di aplikasi
          dan untuk mendukung perkembangan aplikasi PGRI
        </p>
      </div>
      <div className="mt-[20px] flex w-full max-w-[1080px] flex-col items-center gap-4 rounded-[16px] border border-primary-50 bg-white p-4">
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-[8px] bg-primary-500 px-4 py-3 text-[16px] font-bold text-white">
            Validasi Data Diri
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <div className="flex flex-col gap-4">
              <Controller
                control={form.control}
                name="user.name"
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
                name="user.nik"
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
                name="user.email"
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
                name="user.birthPlace"
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
                name="user.birthDate"
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
                name="user.phoneNumber"
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
                name="user.gender"
                render={({ field, fieldState }) => (
                  <Select
                    label={<Required>Jenis Kelamin</Required>}
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
                name="user.latestEducationId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Pendidikan/Ijazah Terakhir</Required>}
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
                name="user.religionId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Agama</Required>}
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
                name="user.bloodTypeId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Golongan Darah</Required>}
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
                name="user.address"
                render={({ field, fieldState }) => (
                  <TextField
                    label={<Required>Alamat KTP</Required>}
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
                name="user.postalCode"
                render={({ field, fieldState }) => (
                  <NumericFormat
                    label={<Required>Kode Pos</Required>}
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
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-[8px] bg-primary-500 px-4 py-3 text-[16px] font-bold text-white">
            Validasi Data Pekerjaan
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <div className="flex flex-col gap-4">
              <Controller
                control={form.control}
                name="userJob.name"
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
                name="userJob.provinceId"
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
                      form.setValue("userJob.cityId", "");
                      form.setValue("userJob.districtId", "");
                      form.setValue("userJob.subDistrictId", "");
                    }}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="userJob.cityId"
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
                      form.setValue("userJob.districtId", "");
                      form.setValue("userJob.subDistrictId", "");
                    }}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={!form.watch("userJob.provinceId")}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="userJob.districtId"
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
                      form.setValue("userJob.subDistrictId", "");
                    }}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled={!form.watch("userJob.cityId")}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="userJob.subDistrictId"
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
                    disabled={!form.watch("userJob.districtId")}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="userJob.address"
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
                name="userJob.jobId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Pekerjaan</Required>}
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
                name="userJob.employmentStatusId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Status Kepegawaian</Required>}
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
                name="userJob.grade"
                render={({ field, fieldState }) => (
                  <TextField
                    label={<Required>Pangkat/Golongan</Required>}
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
                name="userJob.hasCertification"
                render={({ field, fieldState }) => (
                  <Select
                    label={<Required>Sertifikat Pendidik</Required>}
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
                name="userJob.stageId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Jenjang Mengajar</Required>}
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
                name="userJob.subjectId"
                render={({ field, fieldState }) => (
                  <Select
                    getKey={(v) => v.id.toString()}
                    getLabel={(v) => v.name}
                    label={<Required>Mata Pelajaran</Required>}
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
        </div>
        <div className="flex w-full justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep("CONFIRM")}
            disabled={
              userFormData.isLoading ||
              updateUser.isPending ||
              updateInstitution.isPending
            }
          >
            Kembali
          </Button>
          <Button
            type="submit"
            isLoading={updateUser.isPending || updateInstitution.isPending}
            disabled={userFormData.isLoading}
          >
            Validasi Sekarang
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ValidationForm;
