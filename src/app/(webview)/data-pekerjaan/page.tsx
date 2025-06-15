"use client";
// ANCHOR: imports
// #region imports
import React from "react";
import Image from "next/image";
import warningIcon from "@/../public/icon/warning.png";
import { useFormPekerjaanStore } from "@/store/use-data-pekerjaan-store";
import clsx from "clsx";
import { useGetRegionStore } from "@/store/use-get-region-store";

// #endregion

// ANCHOR: types definitions
// #region types definitions
type InputFieldProps = {
  label: string;
  placeholder: string;
  isSelect?: boolean;
  options?: { label: string; value: string }[];
  value?: string;
  onChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
};

type WarningMessageProps = {
  message: string;
};

type SubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

// #endregion

// ANCHOR: helpers
// #region helpers
// Helper untuk mapping data region ke options
const toOptions = (arr: { code: string; name: string }[]) =>
  arr.map((item) => ({ label: item.name, value: item.code }));

const LABELS = {
  instansi: "Nama Instansi Tempat Tugas",
  provinsi: "Provinsi Tempat Tugas",
  kabupaten: "Kabupaten/Kota/Kota Administrasi Tempat Kerja",
  kecamatan: "Kecamatan/Cabang/Distrik Tempat Tugas",
  kelurahan: "Desa/Kelurahan",
  alamat: "Alamat Tempat Tugas",
  pekerjaan: "Pekerjaan",
  status: "Status Kepegawaian",
  pangkat: "Pangkat/Golongan",
  sertifikat: "Sertifikat Pendidik",
  jenjang: "Jenjang Mengajar",
  mapel: "Mata Pelajaran",
};
const PLACEHOLDERS = {
  instansi: "Tulis Nama Instansi",
  provinsi: "Pilih Provinsi",
  kabupaten: "Pilih Kabupaten/Kota/Kota Administrasi Tempat Kerja",
  kecamatan: "Pilih Kecamatan/Cabang/Distrik Tempat Tugas",
  kelurahan: "Pilih Desa/Kelurahan",
  alamat: "Tulis Alamat Tempat Tugas",
  pekerjaan: "Pilih Pekerjaan",
  status: "Pilih Status Kepegawaian",
  pangkat: "Tulis Pangkat/Golongan",
  sertifikat: "Pilih Status",
  jenjang: "Pilih Jenjang Mengajar",
  mapel: "Pilih Mata Pelajaran",
};

type CustomSelectProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
};
const CustomSelect: React.FC<CustomSelectProps> = ({
  value = "",
  onChange,
  options,
  placeholder = "",
  className = "",
}) => (
  <div className={`relative w-full`}>
    <select
      className={clsx(
        "flex h-10 w-full appearance-none items-center rounded-lg border border-gray-300 bg-white px-4 pr-10 text-xs text-gray-400",
        className,
      )}
      value={typeof value === "string" ? value : ""}
      onChange={onChange}
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
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Helper untuk style non-empty state
const inputNonEmptyClass =
  "border-blue-500 text-primary bg-white outline outline-1 outline-[#919191] outline-offset-[-1px]";

// ANCHOR: main-component
// #region main-component
const Main: React.FC = () => {
  const {
    provinces,
    kabupatenKota,
    kecamatan,
    kelurahan,
    selectedProvince,
    selectedKabupatenKota,
    selectedKecamatan,
    selectedKelurahan,
    setSelectedProvince,
    setSelectedKabupatenKota,
    setSelectedKecamatan,
    setSelectedKelurahan,
    fetchProvinces,
    fetchKabupatenKota,
    fetchKecamatan,
    fetchKelurahan,
  } = useGetRegionStore();

  const { formData, setFormData, handleSubmit, isFormIncomplete } =
    useFormPekerjaanStore();

  React.useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);
  React.useEffect(() => {
    if (selectedProvince) fetchKabupatenKota();
  }, [selectedProvince, fetchKabupatenKota]);
  React.useEffect(() => {
    if (selectedKabupatenKota) fetchKecamatan();
  }, [selectedKabupatenKota, fetchKecamatan]);
  React.useEffect(() => {
    if (selectedKecamatan) fetchKelurahan();
  }, [selectedKecamatan, fetchKelurahan]);
  React.useEffect(() => {
    setFormData({
      subdistrict_id: selectedKelurahan,
    });
  }, [selectedKelurahan, setFormData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ [id]: value });
  };

  const handleTextAreaInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData({ [id]: value });
  };

  const pekerjaanOptions = [
    { label: "Guru", value: "Guru" },
    { label: "Tenaga Administrasi", value: "Tenaga Administrasi" },
    { label: "Dosen", value: "Dosen" },
    { label: "Kepala Sekolah", value: "Kepala Sekolah" },
    { label: "Pengawas", value: "Pengawas" },
    { label: "Lainnya", value: "Lainnya" },
  ];
  const statusKepegawaianOptions = [
    { label: "ASN PNS", value: "ASN PNS" },
    { label: "ASN PPPK", value: "ASN PPPK" },
    { label: "Honorer", value: "Honorer" },
    { label: "GTY", value: "GTY" },
    { label: "GTTY", value: "GTTY" },
    { label: "Dosen ASN", value: "Dosen ASN" },
    { label: "Dosen Tetap Yayasan", value: "Dosen Tetap Yayasan" },
    { label: "Dosen Tidak Tetap Yayasan", value: "Dosen Tidak Tetap Yayasan" },
  ];
  const sertifikatPendidikOptions = [
    { label: "Sudah", value: "true" },
    { label: "Belum", value: "false" },
  ];
  const jenjangMengajarOptions = [
    { label: "PAUD", value: "PAUD" },
    { label: "TK", value: "TK" },
    { label: "SD/MI", value: "SD/MI" },
    { label: "SMP/MTS", value: "SMP/MTS" },
    { label: "SMA/MA", value: "SMA/MA" },
    { label: "SMK", value: "SMK" },
    { label: "PT", value: "PT" },
    { label: "Sekolah Luar Biasa (SLB)", value: "Sekolah Luar Biasa (SLB)" },
    { label: "Lainnya", value: "Lainnya" },
  ];

  return (
    <div className="my-4 px-4">
      <h3 className="mb-2 text-sm font-bold text-primary">
        Verifikasi Data Pekerjaan
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Nama Instansi Tempat Tugas */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.instansi}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className={clsx(
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-700",
                formData.name && inputNonEmptyClass,
              )}
              placeholder={PLACEHOLDERS.instansi}
              autoComplete="off"
            />
          </div>
          {/* Provinsi Tempat Tugas */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.provinsi}
            </label>
            <CustomSelect
              value={selectedProvince || ""}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedProvince(event.target.value);
                setSelectedKabupatenKota("");
                setSelectedKecamatan("");
                setSelectedKelurahan("");
              }}
              options={toOptions(provinces)}
              placeholder={PLACEHOLDERS.provinsi}
              className={clsx(selectedProvince && inputNonEmptyClass)}
            />
          </div>
          {/* Kabupaten/Kota/Kota Administrasi Tempat Kerja */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.kabupaten}
            </label>
            <CustomSelect
              value={selectedKabupatenKota || ""}
              onChange={(event) => {
                setSelectedKabupatenKota(event.target.value);
                setSelectedKecamatan("");
                setSelectedKelurahan("");
              }}
              options={toOptions(kabupatenKota)}
              placeholder={PLACEHOLDERS.kabupaten}
              className={clsx(selectedKabupatenKota && inputNonEmptyClass)}
            />
          </div>
          {/* Kecamatan/Cabang/Distrik Tempat Tugas */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.kecamatan}
            </label>
            <CustomSelect
              value={selectedKecamatan || ""}
              onChange={(event) => {
                setSelectedKecamatan(event.target.value);
                setSelectedKelurahan("");
              }}
              options={toOptions(kecamatan)}
              placeholder={PLACEHOLDERS.kecamatan}
              className={clsx(selectedKecamatan && inputNonEmptyClass)}
            />
          </div>
          {/* Desa/Kelurahan */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.kelurahan}
            </label>
            <CustomSelect
              value={selectedKelurahan || ""}
              onChange={(event) => setSelectedKelurahan(event.target.value)}
              options={toOptions(kelurahan)}
              placeholder={PLACEHOLDERS.kelurahan}
              className={clsx(selectedKelurahan && inputNonEmptyClass)}
            />
          </div>
          {/* Alamat Tempat Tugas */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.alamat}
            </label>
            <textarea
              id="address"
              value={formData.address || ""}
              onChange={handleTextAreaInputChange}
              className={clsx(
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-700",
                inputNonEmptyClass,
              )}
              placeholder={PLACEHOLDERS.alamat}
              autoComplete="off"
            />
          </div>
          {/* Pekerjaan */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.pekerjaan}
            </label>
            <CustomSelect
              value={formData.job_title || ""}
              onChange={(e) => {
                const { value, id } = e.target;
                setFormData({ [id || "job_title"]: value });
              }}
              options={pekerjaanOptions}
              placeholder={PLACEHOLDERS.pekerjaan}
              className={clsx(formData.job_title && inputNonEmptyClass)}
            />
          </div>
          {/* Status Kepegawaian */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.status}
            </label>
            <CustomSelect
              value={formData.employee_status || ""}
              onChange={(e) => {
                const { value, id } = e.target;
                setFormData({ [id || "employee_status"]: value });
              }}
              options={statusKepegawaianOptions}
              placeholder={PLACEHOLDERS.status}
              className={clsx(formData.employee_status && inputNonEmptyClass)}
            />
          </div>
          {/* Pangkat/Golongan */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.pangkat}
            </label>
            <input
              type="text"
              id="grade"
              value={formData.grade || ""}
              onChange={handleInputChange}
              className={clsx(
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-700",
                formData.grade && inputNonEmptyClass,
              )}
              placeholder={PLACEHOLDERS.pangkat}
              autoComplete="off"
            />
          </div>
          {/* Sertifikat Pendidik */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.sertifikat}
            </label>
            <CustomSelect
              value={
                formData.educator_certificate === undefined
                  ? ""
                  : formData.educator_certificate
                    ? "true"
                    : "false"
              }
              onChange={(e) => {
                const value = e.target.value === "true";
                const id = e.target.id || "educator_certificate";
                setFormData({ [id]: value });
              }}
              options={sertifikatPendidikOptions}
              placeholder={PLACEHOLDERS.sertifikat}
              className={
                formData.educator_certificate === undefined
                  ? ""
                  : inputNonEmptyClass
              }
            />
          </div>
          {/* Jenjang Mengajar */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.jenjang}
            </label>
            <CustomSelect
              value={formData.stage || ""}
              onChange={(e) => {
                const { value, id } = e.target;
                setFormData({ [id || "stage"]: value });
              }}
              options={jenjangMengajarOptions}
              placeholder={PLACEHOLDERS.jenjang}
              className={clsx(formData.stage && inputNonEmptyClass)}
            />
          </div>
          {/* Mata Pelajaran */}
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black">
              {LABELS.mapel}
            </label>
            <input
              type="text"
              id="study_subjects"
              value={formData.study_subjects || ""}
              onChange={handleInputChange}
              className={clsx(
                "w-full rounded-lg border border-gray-300 px-4 py-2 text-xs text-gray-700",
                formData.study_subjects && inputNonEmptyClass,
              )}
              placeholder={PLACEHOLDERS.mapel}
              autoComplete="off"
            />
          </div>
        </div>
        <WarningMessage message="Pada pendaftaran akun ini kamu boleh langsung melewati proses pengisian data pekerjaan." />
        <SubmitButton disabled={isFormIncomplete()}>Verifikasi</SubmitButton>
      </form>
    </div>
  );
};

export default Main;
// #endregion

// ANCHOR: internal-components
// #region internal-components
const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isSelect = false,
  options = [],
  value = "",
  onChange,
}) => (
  <div className="mb-4">
    <label className="mb-1 block text-xs text-black">{label}</label>
    {isSelect ? (
      <div className="relative w-full">
        <select
          className="flex h-10 w-full appearance-none items-center rounded-lg border border-gray-300 bg-white px-4 pr-10 text-xs text-gray-400"
          value={value}
          onChange={onChange}
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
      <input
        className="flex h-10 w-full items-center rounded-lg border border-gray-300 px-4 text-xs text-gray-700"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
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
// #endregion
