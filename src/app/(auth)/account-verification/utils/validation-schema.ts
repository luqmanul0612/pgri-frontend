import * as yup from "yup";
import { UserVerificationForm } from "./use-verification-form";

export const userVerificationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required("Field ini wajib diisi"),
    nik: yup
      .string()
      .required("Field ini wajib diisi")
      .min(16, "NIK harus 16 digit angka"),
    email: yup
      .string()
      .required("Field ini wajib diisi")
      .email("Email tidak valid"),
    birthPlace: yup.string().required("Field ini wajib diisi"),
    birthDate: yup.string().required("Field ini wajib diisi"),
    gender: yup.string().required("Field ini wajib diisi"),
    religionId: yup.string().required("Field ini wajib diisi"),
    bloodTypeId: yup.string().required("Field ini wajib diisi"),
    phoneNumber: yup
      .string()
      .required("Field ini wajib diisi")
      .min(10, "Nomor telepon harus antara 10 hingga 15 digit angka")
      .max(15, "Nomor telepon harus antara 10 hingga 15 digit angka"),
    address: yup.string().required("Field ini wajib diisi"),
    postalCode: yup
      .string()
      .required("Field ini wajib diisi")
      .test(
        "min-if-present",
        "Kode pos harus 5 digit angka",
        (value) => !value || value.length === 5,
      ),
    latestEducationId: yup.string().required("Field ini wajib diisi"),
  }),
  userJob: yup.object().shape({
    name: yup.string().required("Field ini wajib diisi"),
    provinceId: yup.string().required("Field ini wajib diisi"),
    cityId: yup.string().required("Field ini wajib diisi"),
    districtId: yup.string().required("Field ini wajib diisi"),
    subDistrictId: yup.string().required("Field ini wajib diisi"),
    address: yup.string().required("Field ini wajib diisi"),
    stageId: yup.string().required("Field ini wajib diisi"),
    jobId: yup.string().required("Field ini wajib diisi"),
    employmentStatusId: yup.string().required("Field ini wajib diisi"),
    hasCertification: yup.string().required("Field ini wajib diisi"),
    grade: yup.string().required("Field ini wajib diisi"),
    subjectId: yup.string().required("Field ini wajib diisi"),
  }),
}) as yup.ObjectSchema<UserVerificationForm>;
