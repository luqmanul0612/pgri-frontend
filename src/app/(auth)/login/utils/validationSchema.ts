import * as yup from "yup";
import { BodyLogin } from "../serverAction/post-login";

export const loginSchema = yup.object().shape({
  npa: yup.string().required("NPA wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
}) as yup.ObjectSchema<BodyLogin>;
