import * as yup from "yup";

export interface UpdatePasswordForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
  isAgreed: boolean;
}

export const updatePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required("Kata sandi lama wajib diisi"),
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
    .oneOf([yup.ref("password")], "Kata sandi tidak sesuai"),
}) as yup.ObjectSchema<UpdatePasswordForm>;
