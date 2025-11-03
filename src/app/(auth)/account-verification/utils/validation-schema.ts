import * as yup from "yup";
import { UserVerificationForm } from "./use-verification-form";

export const userVerificationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required("Nama & Gelar wajib diisi"),
    nik: yup
      .string()
      .required("NIK wajib diisi")
      .min(16, "NIK harus 16 digit angka"),
    email: yup
      .string()
      .required("Email wajib diisi")
      .email("Email tidak valid"),
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
  }),
  userJob: yup.object().shape({
    name: yup.string().required("Nama & Gelar wajib diisi"),
    provinceCode: yup.string().required("Provinsi wajib diisi"),
    cityCode: yup.string().required("Kabupaten/Kota wajib diisi"),
    districtCode: yup.string().required("Kecamatan/Cabang/Distrik wajib diisi"),
    subDistrictCode: yup.string().required("Desa/Kelurahan wajib diisi"),
    address: yup.string().required("Alamat Tempat Tugas wajib diisi"),
    stageId: yup.string().notRequired(),
    jobId: yup.string().notRequired(),
    employmentStatusId: yup.string().notRequired(),
    hasCertification: yup.string().notRequired(),
    grade: yup.string().notRequired(),
    subjectId: yup.string().notRequired(),
  }),
}) as yup.ObjectSchema<UserVerificationForm>;
