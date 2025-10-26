import * as yup from "yup";
import {
  UserFormData,
  UserJobData,
  UserPasswordData,
} from "./use-registration-state";

export const userSchema = yup.object().shape({
  name: yup.string().required("Nama & Gelar wajib diisi"),
  nik: yup
    .string()
    .required("NIK wajib diisi")
    .min(16, "NIK harus 16 digit angka"),
  email: yup.string().required("Email wajib diisi").email("Email tidak valid"),
  birthPlace: yup.string().required("Tempat lahir wajib diisi"),
  birthDate: yup.string().required("Tanggal lahir wajib diisi"),
  gender: yup.string().notRequired(),
  religionId: yup.string().notRequired(),
  bloodTypeId: yup.string().notRequired(),
  phoneNumber: yup
    .string()
    .required("Nomor telepon wajib diisi")
    .min(10, "Nomor telepon harus antara 10 hingga 15 digit angka")
    .max(15, "Nomor telepon harus antara 10 hingga 15 digit angka"),
  address: yup.string().notRequired(),
  postalCode: yup
    .string()
    .notRequired()
    .test(
      "min-if-present",
      "Kode pos harus 5 digit angka",
      (value) => !value || value.length === 5,
    ),
  latestEducationId: yup.string().notRequired(),
}) as yup.ObjectSchema<UserFormData>;

export const userJobSchema = yup.object().shape({
  name: yup.string().required("Nama & Gelar wajib diisi"),
  provinceId: yup.string().required("Provinsi wajib diisi"),
  cityId: yup.string().required("Kabupaten/Kota wajib diisi"),
  districtId: yup.string().required("Kecamatan/Cabang/Distrik wajib diisi"),
  subDistrictId: yup.string().required("Desa/Kelurahan wajib diisi"),
  address: yup.string().required("Alamat Tempat Tugas wajib diisi"),
  stageId: yup.string().notRequired(),
  jobId: yup.string().notRequired(),
  employmentStatusId: yup.string().notRequired(),
  hasCertification: yup.string().notRequired(),
  grade: yup.string().notRequired(),
  subjectId: yup.string().notRequired(),
}) as yup.ObjectSchema<UserJobData>;

export const userPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Kata sandi wajib diisi")
    .min(8, "Kata sandi minimal terdiri dari 8 karakter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{8,}$/,
      "Kata sandi harus mengandung minimal 1 angka, 1 huruf kecil, 1 huruf kapital, dan 1 karakter khusus",
    ),
  confirmPassword: yup
    .string()
    .required("Kata sandi wajib diisi")
    .oneOf(
      [yup.ref("password")],
      "Kata sandi tidak sesuai",
    ),
  isAgreed: yup.boolean(),
}) as yup.ObjectSchema<UserPasswordData>;
