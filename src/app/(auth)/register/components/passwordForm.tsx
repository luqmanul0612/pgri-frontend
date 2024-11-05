"use client";
import React, { Dispatch, SetStateAction, useState, Fragment } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Danger from "../../../../../public/assets/danger";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IFormData } from "../page";
import { submitRegistration } from "../serverActions/submitRegistration";
import { ScaleLoader } from "react-spinners";
import { toast } from "@/components/ui/use-toast";
import PasswordSuccess from "../../../../../public/assets/passwordSuccess";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { setCookies } from "@/serverActions/setCookies";

interface PasswordFormProps {
  formData: IFormData;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<IFormData>>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  formData,
  setStep,
  setFormData,
}) => {
  const [password2, setPassword2] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const validatePassword = (password: string) => {
    const hasNumber = /[0-9]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasNumber && hasLowerCase && hasUpperCase && hasSpecialChar;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (formData.password !== password2) {
      setError("Kata sandi tidak cocok.");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("Kata sandi minimal terdiri dari 8 karakter.");
      setIsLoading(false);
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Kata sandi harus mengandung minimal 1 angka, 1 huruf kecil, 1 huruf kapital, dan 1 karakter khusus.",
      );
      setIsLoading(false);
      return;
    }
    setError(null);
    // Add form submission logic here

    const res = await submitRegistration(formData);

    if (res.errors) {
      toast({ title: res.errors ?? res.errors[0], variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // simpan token ke cookies
    if (res.data.token) {
      setCookies("token", res.data.token);
      setCookies("auth", res.data);
    }

    setIsSuccess(true);
    setIsLoading(false);
  };

  if (isSuccess)
    return (
      <div className="flex flex-col items-center justify-start gap-10 rounded-2xl border border-[#17a3b8]/20 p-4">
        <PasswordSuccess />
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <div className="text-center text-2xl font-bold text-[#17191c]">
            Kata Sandi Berhasil Dibuat
          </div>
          <div className="text-center text-xs text-[#ff0000]">
            Pastikan kamu mengingat atau menyimpan Kata Sandi yang telah dibuat!
          </div>
        </div>
        <button
          onClick={() => {
            setStep(3);
          }}
          className="flex w-full items-center justify-center rounded-2xl bg-[#17a3b8] p-4"
        >
          <span className="text-sm text-white">OK</span>
        </button>
      </div>
    );

  return (
    <div className="flex max-w-[600px] flex-col items-start justify-start gap-5 rounded-2xl border border-[#17a3b8]/20 p-4">
      <div className="flex flex-col items-start justify-start gap-4 self-stretch">
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <h2 className="self-stretch text-2xl font-bold text-[#17191c]">
            Buat Kata Sandi
          </h2>
          <p className="self-stretch text-xs font-normal text-[#17191c]">
            Kata Sandi yang anda buat harus berbeda dengan kata sandi yang
            sebelumnya anda gunakan
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
            <Label htmlFor="password1">Password Baru</Label>
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData((v) => {
                  return { ...formData, password: e.target.value };
                });
              }}
              type={showPassword ? "text" : "password"}
              id="password1"
              className="flex w-full items-center gap-2.5 rounded-2xl border border-[#17a3b8]/20 py-3 pl-4 pr-10"
              placeholder="Masukkan Password"
            />
            <div
              className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={20} />
              ) : (
                <AiOutlineEye fontSize={20} />
              )}
            </div>
          </div>

          <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
            <Label htmlFor="password2">Konfirmasi Password Baru</Label>
            <input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type={showPassword2 ? "text" : "password"}
              id="password2"
              className="flex w-full items-center gap-2.5 rounded-2xl border border-[#17a3b8]/20 py-3 pl-4 pr-10"
              placeholder="Konfirmasi Password"
            />
            <div
              className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? (
                <AiOutlineEyeInvisible fontSize={20} />
              ) : (
                <AiOutlineEye fontSize={20} />
              )}
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="flex max-w-[80%] items-center rounded-lg bg-[#ff0000]/10 p-2.5">
          <Danger />
          <p className="ml-2.5 text-xs font-normal text-[#ff0000]">{error}</p>
        </div>
      )}
      <div className="flex w-full flex-col items-start justify-start gap-2.5 self-stretch">
        <div className="flex flex-row gap-2">
          <div>
            <input
              type="checkbox"
              id="agreement"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              className=""
            />
          </div>
          <Label htmlFor="" className="text-sm font-normal text-[#17191c]">
            Dengan ini saya bersedia menjadi Anggota PGRI, menaati AD/ART PGRI,
            memberikan hak pengelolaan dan perlindungan data sesuai UU
            Perlindungan data pribadi.{" "}
            <span
              onClick={openModal}
              className="cursor-pointer font-bold text-[#17a3b8] underline"
            >
              Hak dan kewajiban anggota
            </span>
          </Label>
        </div>
      </div>
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!checkbox || !formData.password || !password2 || isLoading}
        className="w-full rounded-2xl bg-[#17a3b8] p-3.5 text-sm text-white"
      >
        {isLoading ? (
          <ScaleLoader color="white" height={20} />
        ) : (
          "Buat Kata Sandi"
        )}
      </Button>

      <Button
        className="w-full rounded-2xl bg-[#ff0000]"
        onClick={() => {
          setStep(1);
        }}
      >
        Kembali
      </Button>

      {/* modal syarat dan ketentuan */}
      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-[700px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Hak dan Kewajiban Anggota
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      Pasal 14 <br />
                      Yang dapat diterima menjadi anggota PGRI adalah warga
                      negara Republik Indonesia, dan atau asosiasi/komunitas
                      pendidik dan tenaga kependidikan yang dengan sukarela
                      mengajukan permohonan menjadi anggota serta memenuhi
                      persyaratan yang ditentukan dalam Anggaran Rumah Tangga.
                      <br />
                      Pasal 15
                      <br />
                      Keanggotaan berakhir.
                      <br />
                      a. atas permintaan sendiri
                      <br />
                      b. diberhentikanc.
                      <br />
                      c. meninggal dunia; atau
                      <br />
                      d. menjadi pengurus/anggota organisasi profesi lain yang
                      sejenis
                      <br />
                      Pasal 16 <br />
                      (1) Setiap anggota berkewajiban:
                      <br />
                      a. menjunjung tinggi nama dan kehormatan organisasi serta
                      Kode Etik dan Ikrar Guru Indonesia
                      <br />
                      b. mematuhi Anggaran Dasar, Anggaran Rumah Tangga,
                      peraturan, dan disiplin organisasi.
                      <br />
                      c. melaksanakan program organisasi secara aktif.
                      <br />
                      (2) Tata cara melaksanakan kewajiban anggota diatur dalam
                      Anggaran Rumah Tangga.
                      <br />
                      Pasal 17
                      <br />
                      (1) Setiap anggota mempunyai:
                      <br />
                      a. hak bicara,
                      <br />
                      b. hak suara,
                      <br />
                      c. hak memilih,
                      <br />
                      d. hak dipilih,
                      <br />
                      e. hak membela diri,
                      <br />
                      f. hak untuk memperjuangkan peningkatan harkat dan
                      martabatnya, dan
                      <br />
                      g. hak memperoleh pembelaan dan perlindungan hukum.
                      <br />
                      (2) Tata cara penggunaan dan pelaksanaan hak anggota
                      diatur dalam Anggaran Rumah Tangga.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white"
                      onClick={closeModal}
                    >
                      Ok
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </div>
  );
};

export default PasswordForm;
