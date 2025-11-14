"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { BodyLogin, postLogin } from "../serverAction/post-login";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useAuth from "@/store/useAuth";
import PgriLogo from "../../../../../public/pgri-logo.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validationSchema";
import TextField from "@/components/customs/textfield";
import useMutation from "@/utils/hooks/use-mutation";
import Button from "@/components/customs/button";
import useRegistrationState from "../../register/utils/use-registration-state";

interface RightSectionProps {}

const defaultValues: BodyLogin = {
  npa: "",
  password: "",
  push_token: "",
  id_device: "",
  phone: "",
};

export const RightSection: FC<RightSectionProps> = () => {
  const router = useRouter();
  const { setUser, setRenewPassword } = useAuth();
  const { resetRegisterState } = useRegistrationState();
  const [errorMessage, setErrorMessage] = useState("");

  const loginForm = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      toast({ title: "Berhasil Login" });
      if (res.data?.renew_password) {
        setRenewPassword(true);
        router.push("/renew-password");
      } else {
        setUser(res.data.user);
        if (!res.data?.user?.is_validated) {
          router.push("/account-validation");
        } else if (!res.data?.user?.is_verified) {
          router.push("/account-verification");
        } else {
          router.push("/dashboard");
        }
      }
    },
    onError: (err: { message: string }) => {
      setErrorMessage(err.message);
    },
  });

  const handleSubmit = loginForm.handleSubmit(async (values) => {
    setErrorMessage("");
    resetRegisterState();
    mutate(values);
  });

  return (
    <section className="flex min-w-[468px] flex-col items-center">
      <div className="flex flex-col items-center">
        <PgriLogo width={80} height={80} />
        <p className="text-[24px] font-bold text-black">
          Selamat Datang Kembali
        </p>
        <p className="text text-center text-[12px] font-normal text-black">
          Kartu Tanda Anggota Persatuan Guru Republik Indonesia
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex h-fit w-full flex-col gap-4"
      >
        <Controller
          control={loginForm.control}
          name="npa"
          render={({ field, fieldState }) => (
            <TextField
              label="NPA"
              placeholder="Masukkan NPA"
              onChange={field.onChange}
              value={field.value}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={loginForm.control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              label="Kata Sandi"
              type="password"
              onChange={field.onChange}
              placeholder="Masukkan Kata Sandi"
              value={field.value}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="flex justify-end">
          <Link href="/lupa-sandi" className="text-[14px] text-[#17A3B8]">
            Lupa Kata Sandi?
          </Link>
        </div>
        <Button type="submit" isLoading={isPending} fullWidth>
          Masuk
        </Button>
        {!!errorMessage && (
          <p className="mt-2 text-center text-[0.75rem] text-red-500">
            {errorMessage}
          </p>
        )}
        <p className="mt-2 text-center text-[0.75rem]">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="cursor-pointer text-[#17A3B8]"
          >
            Daftar di sini
          </span>
        </p>
      </form>
    </section>
  );
};
