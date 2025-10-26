"use client";
import React from "react";
import PasswordSuccess from "../../../../../public/assets/passwordSuccess";
import Button from "@/components/customs/button";
import Checkbox from "@/components/customs/checkbox";
import useRegistrationState, {
  UserPasswordData,
} from "../utils/use-registration-state";
import { Controller, useForm, useWatch } from "react-hook-form";
import { userPasswordSchema } from "../utils/validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { postAuthRegister } from "../serverActions/post-auth-register";
import useMutation from "@/utils/hooks/use-mutation";
import { toast } from "sonner";
import dayjs from "dayjs";
import TextField from "@/components/customs/textfield";
import Required from "@/components/customs/required";
import Danger from "../../../../../public/assets/danger";
import { setCookies } from "@/serverActions/setCookies";
import { decodeJwt } from "@/lib/utils";
import { TokenValue } from "../serverActions/payment";
import useAuth from "@/store/useAuth";

const defaultValues: UserPasswordData = {
  password: "",
  confirmPassword: "",
  isAgreed: false,
};

const PasswordForm = () => {
  const { setStep, setIsSubmited, isSubmited, jobData, userData } =
    useRegistrationState();

  const { setAuth } = useAuth();

  const form = useForm<UserPasswordData>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(userPasswordSchema),
  });

  const values = useWatch({ control: form.control });

  const { isPending, mutate } = useMutation({
    mutationFn: postAuthRegister,
    onSuccess: (res) => {
      setIsSubmited();
      setStep(4);
      const token = res.data.token;
      setCookies("token", token);
      setCookies("auth", res.data);
      const tokenValue = decodeJwt<TokenValue>(token as string);
      setAuth({
        id: res?.data?.id,
        name: res?.data?.name,
        email: res?.data?.email,
        phoneNumber: res?.data?.phone_number,
        isVerified: !!tokenValue?.is_verified,
        levelId: tokenValue?.level_id ?? 3,
        createdAt: res?.data?.created_at,
        address: res?.data?.address,
        birthPlace: res?.data?.birth_place,
        bloodType: res?.data?.blood_type,
        dob: res?.data?.dob,
        gender: res?.data?.gender,
        latestEducation: res?.data?.latest_education,
        nik: res?.data?.nik,
        npaNumber: res?.data?.npa_number,
        postalCode: res?.data?.postal_code,
        religion: res?.data?.religion,
      });
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setStep(3);
    mutate({
      password: values.password,
      name: userData.name,
      nik: userData.nik,
      email: userData.email,
      birth_place: userData.birthPlace,
      birth_date: dayjs(userData.birthDate).format("YYYY-MM-DD"),
      phone_number: userData.phoneNumber,
      gender: userData.gender ? userData.gender : undefined,
      religion_id: userData.religionId
        ? Number(userData.religionId)
        : undefined,
      blood_type_id: userData.bloodTypeId
        ? Number(userData.bloodTypeId)
        : undefined,
      address: userData.address ? userData.address : undefined,
      postal_code: userData.postalCode ? userData.postalCode : undefined,
      latest_education_id: userData.latestEducationId
        ? Number(userData.latestEducationId)
        : undefined,
      user_institution: {
        name: jobData.name,
        subdistrict_id: Number(jobData.subDistrictId),
        address: jobData.address,
        job_id: Number(jobData.jobId),
        stage_id: jobData.stageId ? Number(jobData.stageId) : undefined,
        employment_status_id: jobData.employmentStatusId
          ? Number(jobData.employmentStatusId)
          : undefined,
        has_certification: jobData.hasCertification
          ? jobData.hasCertification === "1"
            ? true
            : false
          : undefined,
        grade: jobData.grade ? jobData.grade : undefined,
        subject_id: jobData.subjectId ? Number(jobData.subjectId) : undefined,
      },
    });
  });

  if (isSubmited)
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
      className="flex w-full max-w-[500px] flex-col items-start justify-center gap-6 rounded-2xl border border-[#17a3b8]/20 bg-white p-4"
    >
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <div className="flex flex-col items-start justify-start gap-1">
          <h2 className="text-[18px] font-bold text-slate-900">
            Buat Kata Sandi
          </h2>
          <p className="self-stretch text-xs font-normal text-slate-600">
            Kata Sandi yang dibuat akan digunakan untuk mengkases aplikasi
            Mobile PGRIKU, diharapkan untuk membuat kata sandi yang mudah di
            ingat! Pastikan kata sandi terdiri dari Huruf Besar, Kecil, Simbol
            dan Angka. Contoh:{" "}
            <span className="text-primary-500">Sandiku@123</span>
          </p>
        </div>
        <div className="flex w-full items-center gap-2 rounded-[8px] bg-red-50 px-2 py-1 text-[10px] text-red-500">
          <Danger />
          Pastikan kamu mengingat atau menyimpan Kata Sandi yang telah dibuat!
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Kata Sandi</Required>}
                placeholder="Masukkan Kata Sandi"
                type="password"
                className="w-full"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <TextField
                label={<Required>Ulangi Kata Sandi</Required>}
                placeholder="Masukkan Kata Sandi"
                type="password"
                className="w-full"
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-3">
          <Controller
            control={form.control}
            name="isAgreed"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            )}
          />
          <p className="text-[12px] font-normal text-slate-600">
            Dengan ini saya bersedia menjadi Anggota PGRI, menaati AD/ART PGRI,
            memberikan hak pengelolaan dan perlindungan data sesuai UU
            Perlindungan data pribadi.{" "}
            <span className="cursor-pointer font-bold text-[#17a3b8] underline">
              Hak dan kewajiban anggota
            </span>
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Button
          type="button"
          fullWidth
          variant="secondary"
          onClick={() => setStep(2)}
        >
          Kembali
        </Button>
        <Button
          fullWidth
          type="submit"
          disabled={!values.isAgreed}
          isLoading={isPending}
        >
          Buat Kata Sandi
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
