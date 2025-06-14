import React from "react";
import Image from "next/image";
import warningIcon from "@/../public/icon/warning.png";

// Type definitions
type InputFieldProps = {
  label: string;
  placeholder: string;
  isSelect?: boolean;
  options?: { label: string; value: string }[];
};

type SectionHeaderProps = {
  title: string;
};

type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

type WarningMessageProps = {
  message: string;
};

type SubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div>
    <h3 className="mb-2 text-sm font-bold text-primary">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isSelect = false,
  options = [],
}) => (
  <div className="mb-4">
    <label className="mb-1 block text-xs text-black">{label}</label>
    {isSelect ? (
      <div className="relative w-full">
        <select
          className="flex h-10 w-full appearance-none items-center rounded-lg border border-gray-300 bg-white px-4 pr-10 text-xs text-gray-400"
          defaultValue=""
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Trailing icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    ) : (
      <div className="flex h-10 items-center rounded-lg border border-gray-300 px-4">
        <span className="flex-1 truncate text-xs text-gray-400">
          {placeholder}
        </span>
      </div>
    )}
  </div>
);

const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => (
  <div className="mb-6 mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-2">
    {/* Warning icon using flexbox */}
    <Image alt="warning" src={warningIcon} height={18} width={18} />
    <p className="flex-1 text-[10px] text-red-500">{message}</p>
  </div>
);

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  disabled = false,
}) => (
  <button
    className={`w-full rounded-lg p-4 text-sm ${
      disabled ? "bg-gray-200 text-gray-400" : "bg-blue-600 text-white"
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

// Main component
const VerificationForm: React.FC = () => {
  return (
    <div className="my-4 flex w-full max-w-md flex-col gap-4 px-4">
      <div className="flex flex-col">
        <FormSection title="Verifikasi Data Pekerjaan">
          <div className="space-y-4">
            <InputField
              label="Nama Instansi Tempat Tugas"
              placeholder="Tulis Nama Instansi"
            />
            <InputField
              label="Provinsi Tempat Tugas"
              placeholder="Pilih Provinsi"
              isSelect
              options={[
                { label: "Provinsi 1", value: "provinsi_1" },
                { label: "Provinsi 2", value: "provinsi_2" },
              ]}
            />
            <InputField
              label="Kabupaten/Kota/Kota Administrasi"
              placeholder="Pilih Kabupaten/Kota/Kota Administrasi"
              isSelect
              options={[
                { label: "Kabupaten 1", value: "kabupaten_1" },
                { label: "Kota 1", value: "kota_1" },
              ]}
            />
            <InputField
              label="Kecamatan/Cabang/Distrik"
              placeholder="Pilih Kecamatan/Cabang/Distrik"
              isSelect
              options={[
                { label: "Kecamatan 1", value: "kecamatan_1" },
                { label: "Cabang 1", value: "cabang_1" },
              ]}
            />
            <InputField
              label="Desa/Kelurahan"
              placeholder="Pilih Desa/Kelurahan"
              isSelect
              options={[
                { label: "Desa 1", value: "desa_1" },
                { label: "Kelurahan 1", value: "kelurahan_1" },
              ]}
            />
            <InputField
              label="Alamat Tempat Tugas"
              placeholder="Tulis Alamat Tempat Tugas"
            />
            <InputField
              label="Pekerjaan"
              placeholder="Pilih Pekerjaan"
              isSelect
              options={[
                { label: "Pekerjaan 1", value: "pekerjaan_1" },
                { label: "Pekerjaan 2", value: "pekerjaan_2" },
              ]}
            />
            <InputField
              label="Status Kepegawaian"
              placeholder="Pilih Status Kepegawaian"
              isSelect
              options={[
                { label: "Status 1", value: "status_1" },
                { label: "Status 2", value: "status_2" },
              ]}
            />
            <InputField
              label="Pangkat/Golongan"
              placeholder="Tulis Pangkat/Golongan"
            />
            <InputField
              label="Sertifikat Pendidik"
              placeholder="Pilih Status"
              isSelect
              options={[
                { label: "Ada", value: "ada" },
                { label: "Tidak Ada", value: "tidak_ada" },
              ]}
            />
            <InputField
              label="Jenjang Mengajar"
              placeholder="Pilih Jenjang Mengajar"
              isSelect
              options={[
                { label: "SD", value: "sd" },
                { label: "SMP", value: "smp" },
                { label: "SMA", value: "sma" },
              ]}
            />
            <InputField
              label="Mata Pelajaran"
              placeholder="Pilih Mata Pelajaran"
              isSelect
              options={[
                { label: "Matematika", value: "matematika" },
                { label: "Bahasa Indonesia", value: "bahasa_indonesia" },
                { label: "IPA", value: "ipa" },
              ]}
            />
          </div>

          <WarningMessage message="Pada pendaftaran akun ini kamu boleh langsung melewati proses pengisian data pekerjaan" />
        </FormSection>

        <SubmitButton disabled={false}>Verifikasi</SubmitButton>
      </div>
    </div>
  );
};

export default VerificationForm;
