"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Danger from "../../../../../public/assets/danger";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/app/components/FormField";
import clsx from "clsx";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";
import { useGetRegionStore } from "@/store/use-get-region-store";
import { useFormPekerjaanStore } from "@/store/use-data-pekerjaan-store";

export const DataPekerjaan = ({}) => {
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
  const { setStep } = useRegistrationStepStore();
  const { formData, setFormData, handleSubmit } = useFormPekerjaanStore();

  // get data provinsi
  useEffect(() => {
    fetchProvinces();
  }, []);

  // get data kota / kabupaten
  useEffect(() => {
    if (selectedProvince) {
      fetchKabupatenKota();
    }
  }, [selectedProvince]);

  //  get data kecamatan / district

  useEffect(() => {
    if (selectedKabupatenKota) {
      fetchKecamatan();
    }
  }, [selectedKabupatenKota]);

  // get data desa / kelurahan
  useEffect(() => {
    if (selectedKecamatan) {
      fetchKelurahan();
    }
  }, [selectedKecamatan]);

  useEffect(() => {
    setFormData({ subdistrict_id: selectedKelurahan });
  }, [selectedKelurahan]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      [id]: value,
    });
  };

  const handleTextAreaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      [id]: value,
    });
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-[#17a3b8]/20 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {/* Provinsi Tempat Tugas */}
            <FormField label="Provinsi Tempat Tugas">
              <div className="relative">
                <select
                  id="provinsi"
                  value={selectedProvince}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setSelectedProvince(event.target.value);
                    setSelectedKabupatenKota("");
                    setSelectedKecamatan("");
                    setSelectedKelurahan("");
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    selectedProvince
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih Provinsi
                  </option>
                  {provinces.map((data) => (
                    <option key={data.code} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    selectedProvince ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Kabupaten/Kota Tempat Tugas */}
            <FormField label="Kabupaten/Kota Tempat Tugas">
              <div className="relative">
                <select
                  id="kabupaten"
                  value={selectedKabupatenKota}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setSelectedKabupatenKota(event.target.value);
                    setSelectedKecamatan("");
                    setSelectedKelurahan("");
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    selectedKabupatenKota
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                  disabled={!selectedProvince}
                >
                  <option value="" disabled>
                    Pilih Kabupaten/Kota
                  </option>
                  {kabupatenKota.map((data) => (
                    <option key={data.code} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    selectedKabupatenKota ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Kecamatan Tempat Tugas */}
            <FormField label="Kecamatan Tempat Tugas">
              <div className="relative">
                <select
                  id="kecamatan"
                  value={selectedKecamatan}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setSelectedKecamatan(event.target.value);
                    setSelectedKelurahan("");
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    selectedKecamatan
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                  disabled={!selectedKabupatenKota}
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {kecamatan.map((data) => (
                    <option key={data.code} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    selectedKecamatan ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Kelurahan/Desa Tempat Tugas */}
            <FormField label="Desa/Kelurahan Tempat Tugas">
              <div className="relative">
                <select
                  id="kelurahan"
                  value={selectedKelurahan}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setSelectedKelurahan(event.target.value);
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    selectedKelurahan
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                  disabled={!selectedKecamatan}
                >
                  <option value="" disabled>
                    Pilih Desa/Kelurahan
                  </option>
                  {kelurahan.map((data) => (
                    <option key={data.code} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    selectedKelurahan ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Nama Instansi Tempat Tugas */}
            <FormField label="Nama Instansi Tempat Tugas">
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3",
                  formData.name
                    ? "border-[#17a3b8]/20 text-[#17a3b8]"
                    : "border-gray-300 text-gray-400",
                )}
                placeholder="Nama Instansi Tempat Tugas"
                autoComplete="off"
              />
            </FormField>

            {/* Alamat Tempat Tugas */}
            <FormField label="Alamat Tempat Tugas">
              <textarea
                id="address"
                value={formData.address}
                onChange={handleTextAreaInputChange}
                className={clsx(
                  "h-24 w-full rounded-2xl py-3 pl-4 pr-3",
                  formData.address
                    ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                    : "border border-gray-300 text-gray-400",
                )}
                placeholder="Alamat tempat tugas"
                autoComplete="off"
              />
            </FormField>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {/* Pekerjaan */}
            <FormField label="Pekerjaan">
              <div className="relative">
                <select
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const { value, id } = e.target;
                    setFormData({
                      [id]: value,
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    formData.job_title
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih Pekerjaan
                  </option>
                  <option value="Guru">Guru</option>
                  <option value="Tenaga Administrasi">
                    Tenaga Administrasi
                  </option>
                  <option value="Dosen">Dosen</option>
                  <option value="Kepala Sekolah">Kepala Sekolah</option>
                  <option value="Pengawas">Pengawas</option>
                  <option value="Lainnya">Lainnya..</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    formData.job_title ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Status Kepegawaian */}
            <FormField label="Status Kepegawaian">
              <div className="relative">
                <select
                  id="employee_status"
                  value={formData.employee_status}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const { value, id } = e.target;
                    setFormData({
                      [id]: value,
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    formData.employee_status
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih Status Kepegawaian
                  </option>
                  <option value="ASN PNS">ASN PNS</option>
                  <option value="ASN PPPK">ASN PPPK</option>
                  <option value="Honorer">Honorer</option>
                  <option value="GTY">GTY</option>
                  <option value="GTTY">GTTY</option>
                  <option value="Dosen ASN">Dosen ASN</option>
                  <option value="Dosen Tetap Yayasan">
                    Dosen Tetap Yayasan
                  </option>
                  <option value="Dosen Tidak Tetap Yayasan">
                    Dosen Tidak Tetap Yayasan
                  </option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    formData.employee_status
                      ? "text-[#17a3b8]"
                      : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Pangkat/Golongan */}
            <FormField label="Pangkat/Golongan">
              <Input
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3",
                  formData.grade
                    ? "border-[#17a3b8]/20 text-[#17a3b8]"
                    : "border-gray-300 text-gray-400",
                )}
                placeholder="Pangkat/Golongan"
                id="grade"
                value={formData.grade}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </FormField>

            {/* Sertifikat Pendidik */}
            <FormField label="Sertifikat Pendidik">
              <div className="relative">
                <select
                  id="educator_certificate"
                  value={formData.educator_certificate ? "true" : "false"}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value === "true";
                    const id = e.target.id;
                    setFormData({
                      [id]: value,
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    formData.educator_certificate
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="true">SUDAH</option>
                  <option value="false">BELUM</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    formData.educator_certificate
                      ? "text-[#17a3b8]"
                      : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Jenjang Mengajar */}
            <FormField label="Jenjang Mengajar">
              <div className="relative">
                <select
                  id="stage"
                  value={formData.stage}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const { value, id } = e.target;
                    setFormData({
                      [id]: value,
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl py-3 pl-4 pr-8",
                    formData.stage
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih Jenjang Mengajar
                  </option>
                  <option value="PAUD">PAUD</option>
                  <option value="TK">TK</option>
                  <option value="SD/MI">SD/MI</option>
                  <option value="SMP/MTS">SMP/MTS</option>
                  <option value="SMA/MA">SMA/MA</option>
                  <option value="SMK">SMK</option>
                  <option value="PT">PT</option>
                  <option value="Sekolah Luar Biasa (SLB)">
                    Sekolah Luar Biasa (SLB)
                  </option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${
                    formData.stage ? "text-[#17a3b8]" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Mata Pelajaran */}
            <FormField label="Mata Pelajaran">
              <Input
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3",
                  formData.study_subjects
                    ? "border-[#17a3b8]/20 text-[#17a3b8]"
                    : "border-gray-300 text-gray-400",
                )}
                placeholder="Mata Pelajaran"
                id="study_subjects"
                value={formData.study_subjects}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </FormField>
          </div>
        </div>

        {/* Error & Navigation */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg bg-[#ff0000]/10 px-2.5 py-[5px]">
            <Danger />
            <div className="text-xs font-normal text-[#ff0000]">
              Pada pendaftaran akun ini kamu boleh langsung melewati proses
              pengisian data pekerjaan
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className="w-[200px] rounded-2xl border bg-white text-[#17a3b8] ring-1 ring-[#17a3b8]"
              onClick={() => setStep(4)}
            >
              Lewati
            </Button>
            <Button
              className="w-[200px] rounded-2xl bg-[#17a3b8]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
