"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Danger from "../../../../../public/assets/danger";
import { Label } from "@/components/ui/label";
import { ScaleLoader } from "react-spinners";
import PasswordSuccess from "../../../../../public/assets/passwordSuccess";
import { useRegistrationFormStore } from "@/store/use-registration-form";
import Button from "@/components/customs/button";
import Checkbox from "@/components/customs/checkbox";

const PasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    passwordFormData,
    isLoading,
    updateField,
    setStep,
    errors,
    handlerSubmitForm,
  } = useRegistrationFormStore();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handlerSubmitForm();
  }

  if (passwordFormData.isSubmited)
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
            setStep(4);
          }}
          className="flex w-full items-center justify-center rounded-2xl bg-[#17a3b8] p-4"
        >
          <span className="text-sm text-white">OK</span>
        </button>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[600px] flex-col items-start justify-start gap-5 rounded-2xl border border-[#17a3b8]/20 p-4"
    >
      <div className="flex flex-col items-start justify-start gap-4 self-stretch">
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <h2 className="self-stretch text-2xl font-bold text-[#17191c]">
            Buat Kata Sandi
          </h2>
          <p className="self-stretch text-xs font-normal text-[#17191c]">
            Kata Sandi yang Anda buat harus berbeda dengan kata sandi yang
            sebelumnya Anda gunakan
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
            <Label htmlFor="password1">Password Baru</Label>
            <input
              value={passwordFormData.password}
              onChange={(e) => {
                updateField("password", e.target.value);
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
              value={passwordFormData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              id="password2"
              className="flex w-full items-center gap-2.5 rounded-2xl border border-[#17a3b8]/20 py-3 pl-4 pr-10"
              placeholder="Konfirmasi Password"
            />
            <div
              className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={20} />
              ) : (
                <AiOutlineEye fontSize={20} />
              )}
            </div>
          </div>
        </div>
      </div>
      {(errors.confirmPassword || errors.password) && (
        <div className="flex max-w-[80%] items-center rounded-lg bg-[#ff0000]/10 p-2.5">
          <Danger />
          <p className="ml-2.5 text-xs font-normal text-[#ff0000]">
            {errors.password || errors.confirmPassword}
          </p>
        </div>
      )}
      <div className="flex w-full flex-col items-start justify-start gap-2.5 self-stretch">
        <div className="flex flex-row gap-2">
          <div>
            <Checkbox
              id="agreement"
              checked={passwordFormData.isAgreed}
              onCheckedChange={(checked) => updateField("isAgreed", !!checked)}
              className=""
            />
          </div>
          <Label htmlFor="" className="text-sm font-normal text-[#17191c]">
            Dengan ini saya bersedia menjadi Anggota PGRI, menaati AD/ART PGRI,
            memberikan hak pengelolaan dan perlindungan data sesuai UU
            Perlindungan data pribadi.{" "}
            <span className="cursor-pointer font-bold text-[#17a3b8] underline">
              Hak dan kewajiban anggota
            </span>
          </Label>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          type="button"
          fullWidth
          variant="secondary"
          className="w-full rounded-2xl bg-[#ff0000]"
          onClick={() => {
            setStep(2);
          }}
        >
          Kembali
        </Button>
        <Button
          fullWidth
          type="submit"
          disabled={
            !passwordFormData.isAgreed ||
            !passwordFormData.password ||
            !passwordFormData.confirmPassword ||
            isLoading
          }
        >
          {isLoading ? (
            <ScaleLoader color="white" height={20} />
          ) : (
            "Buat Kata Sandi"
          )}
        </Button>
      </div>

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
    </form>
  );
};

export default PasswordForm;
