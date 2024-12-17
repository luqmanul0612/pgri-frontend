"use client";

import React, { useState } from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface pageProps {
  params: {
    id: string;
  };
}

const EditAnggota: React.FC<pageProps> = () => {
  const [formData, setFormData] = useState({
    namaIntasiTempatTugas: '',
    provinces: '',
    city: '',
    district: '',
    subdistrict: '',
    address: '',
    pekerjaan: '',
    status_pegawai: '',
    pangkat: '',
    setifikat_pendidik: '',
    jenjang_mengajar: '',
    mata_pelajaran: '',
    kata_sandi: '',
    kata_sandi_baru: '',
    ulangi_kata_sandi: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Data Pribadi */}
        <div id={'dataPribadi'} className={'flex flex-col gap-4 mb-4'}>
          {/*  Judul Data Pribadi */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>1</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Pribadi</h2>
          </div>

          {/* Form Data Pribadi */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl'}>
            <div className={'flex gap-[26px]'}>
            <div className={'w-1/2 flex flex-col gap-6'}>
              {/* Nama Instansi */}
              <FormField label={'Nama Instansi Tempat Tugas'}>
                <Input
                  id={'namaInstansiTempatTugas'}
                  value={formData.namaIntasiTempatTugas}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, namaIntasiTempatTugas: e.target.value };
                    })
                  }}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                    formData.namaIntasiTempatTugas ? "border-[#17a3b8]/20" : "border-gray-300",
                  )}
                  placeholder="Masukkan nama"
                  autoComplete="off"
                />
              </FormField>

              {/* Provinsi */}
              <FormField label={'Provinsi Tempat Tugas'}>
                <div className="relative">
                  <select
                    required
                    id="provinces"
                    value={formData.provinces}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, provinces: e.target.value };
                      });
                    }}
                    className={clsx(
                      "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                      formData.provinces
                        ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                        : "border border-gray-300 text-gray-400",
                    )}
                  >
                    <option value="" disabled>
                      Pilih...
                    </option>
                    <option value="SMA/SMK">Jawa Barat</option>
                    <option value="D3">Jawa Tengah</option>
                    <option value="S1">Jawa Timur</option>
                    <option value="S2">Sumatra Utara</option>
                    <option value="S3">Sumatra Barat</option>
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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

              {/* Kabupaten/Kota/Kota Administrasi Tempat Kerja */}
              <FormField label={'Kabupaten/Kota/Kota Administrasi Tempat Kerja'}>
                <div className="relative">
                  <select
                    required
                    id="city"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, city: e.target.value };
                      });
                    }}
                    className={clsx(
                      "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                      formData.city
                        ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                        : "border border-gray-300 text-gray-400",
                    )}
                  >
                    <option value="" disabled>
                      Pilih...
                    </option>
                    <option value="SMA/SMK">Jawa Barat</option>
                    <option value="D3">Jawa Tengah</option>
                    <option value="S1">Jawa Timur</option>
                    <option value="S2">Sumatra Utara</option>
                    <option value="S3">Sumatra Barat</option>
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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

              {/* Kecamatan/Cabang/Distrik Tempat Tugas */}
              <FormField label={'Kecamatan/Cabang/Distrik Tempat Tugas'}>
                <div className="relative">
                  <select
                    required
                    id="district"
                    value={formData.district}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, district: e.target.value };
                      });
                    }}
                    className={clsx(
                      "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                      formData.district
                        ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                        : "border border-gray-300 text-gray-400",
                    )}
                  >
                    <option value="" disabled>
                      Pilih...
                    </option>
                    <option value="SMA/SMK">Jawa Barat</option>
                    <option value="D3">Jawa Tengah</option>
                    <option value="S1">Jawa Timur</option>
                    <option value="S2">Sumatra Utara</option>
                    <option value="S3">Sumatra Barat</option>
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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

              {/* Desa/Kelurahan */}
              <FormField label={'Desa/Kelurahan'}>
                <div className="relative">
                  <select
                    required
                    id="subdistrict"
                    value={formData.subdistrict}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, subdistrict: e.target.value };
                      });
                    }}
                    className={clsx(
                      "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                      formData.subdistrict
                        ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                        : "border border-gray-300 text-gray-400",
                    )}
                  >
                    <option value="" disabled>
                      Pilih...
                    </option>
                    <option value="SMA/SMK">Jawa Barat</option>
                    <option value="D3">Jawa Tengah</option>
                    <option value="S1">Jawa Timur</option>
                    <option value="S2">Sumatra Utara</option>
                    <option value="S3">Sumatra Barat</option>
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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

              {/* Alamat Tempat Tugas */}
              <FormField label={'Alamat Tempat Tugas'}>
                <textarea
                  id={'address'}
                  value={formData.address}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, address: e.target.value }
                    })
                  }}
                  placeholder={'Masukan Tempat Tugas'}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                    formData.namaIntasiTempatTugas ? "border-[#17a3b8]/20" : "border-gray-300",
                  )}
                ></textarea>
              </FormField>
            </div>

              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Pekerjaan */}
                <FormField label={'Pekerjaan'}>
                  <div className="relative">
                    <select
                      required
                      id="pekerjaan"
                      value={formData.pekerjaan}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, pekerjaan: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.pekerjaan
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      <option value="SMA/SMK">Jawa Barat</option>
                      <option value="D3">Jawa Tengah</option>
                      <option value="S1">Jawa Timur</option>
                      <option value="S2">Sumatra Utara</option>
                      <option value="S3">Sumatra Barat</option>
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                {/* Status Pegawai */}
                <FormField label={'Status Pegawai'}>
                  <div className="relative">
                    <select
                      required
                      id="status_pegawai"
                      value={formData.status_pegawai}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, status_pegawai: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.status_pegawai
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      <option value="SMA/SMK">Jawa Barat</option>
                      <option value="D3">Jawa Tengah</option>
                      <option value="S1">Jawa Timur</option>
                      <option value="S2">Sumatra Utara</option>
                      <option value="S3">Sumatra Barat</option>
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                <FormField label={'Pangkat/Golongan'}>
                  <Input
                    id={'pangkat'}
                    value={formData.pangkat}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, pangkat: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.pangkat ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Pangkat/Golongan"
                    autoComplete="off"
                  />
                </FormField>

                {/* Setifikat Pendidik */}
                <FormField label={'Sertifikat Pendidik'}>
                  <div className="relative">
                    <select
                      required
                      id="setifikat_pendidik"
                      value={formData.setifikat_pendidik}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, setifikat_pendidik: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.setifikat_pendidik
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      <option value="SMA/SMK">Jawa Barat</option>
                      <option value="D3">Jawa Tengah</option>
                      <option value="S1">Jawa Timur</option>
                      <option value="S2">Sumatra Utara</option>
                      <option value="S3">Sumatra Barat</option>
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                <FormField label={'Jenjang Mengajar'}>
                  <div className="relative">
                    <select
                      required
                      id="jenjang_mengajar"
                      value={formData.jenjang_mengajar}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, jenjang_mengajar: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.jenjang_mengajar
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      <option value="SMA/SMK">Jawa Barat</option>
                      <option value="D3">Jawa Tengah</option>
                      <option value="S1">Jawa Timur</option>
                      <option value="S2">Sumatra Utara</option>
                      <option value="S3">Sumatra Barat</option>
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                <FormField label={'Mata Pelajaran'}>
                  <Input
                    id={'mata_pelajaran'}
                    value={formData.mata_pelajaran}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, mata_pelajaran: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.mata_pelajaran ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Mata Pelajaran"
                    autoComplete="off"
                  />
                </FormField>


              </div>
            </div>
          </div>
        </div>

        {/* Data Pekerjaan */}
        <div id={'dataPekerjaan'} className={'flex flex-col gap-4'}>
          {/*  Judul Data Pekerjaan */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>2</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Pekerjaan</h2>
          </div>

          {/* Form Data Pekerjaan */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl'}>

            <div className={'flex gap-[26px]'}>
              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Mata Pelajaran */}
                <FormField label={'Mata Pelajaran'}>
                  <Input
                    id={'mata_pelajaran'}
                    value={formData.mata_pelajaran}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, mata_pelajaran: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.mata_pelajaran ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Mata Pelajaran"
                    autoComplete="off"
                  />
                </FormField>
              </div>
              <div className={'w-1/2 flex flex-col gap-6'}></div>
            </div>
          </div>
        </div>

        {/* Data Poto & E-KTP */}
        <div id={'dataPotoDanKtp'} className={'flex flex-col gap-4'}>
          {/*  Judul Data Pekerjaan */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>2</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Foto & E-KTP</h2>
          </div>

          {/* Form Data Pekerjaan */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl'}>

            <div className={'flex gap-[26px]'}>
              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Mata Pelajaran */}
                <FormField label={'Mata Pelajaran'}>
                  <Input
                    id={'mata_pelajaran'}
                    value={formData.mata_pelajaran}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, mata_pelajaran: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.mata_pelajaran ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Mata Pelajaran"
                    autoComplete="off"
                  />
                </FormField>
              </div>
              <div className={'w-1/2 flex flex-col gap-6'}></div>
            </div>
          </div>
        </div>

        {/* Kata Sandi */}
        <div id={'dataKataSandi'} className={'flex flex-col gap-4'}>
          {/*  Judul Data Kata Sandi */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>2</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Foto & E-KTP</h2>
          </div>

          {/* Form Data Kata Sandi */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl'}>

            <div className={'flex gap-[26px]'}>
              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Kata Sandi */}
                <FormField label={'Kata Sandi'}>
                  <Input
                    id={'kataSandi'}
                    value={formData.kata_sandi}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, kata_sandi: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.kata_sandi ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Kata Sandi"
                    autoComplete="off"
                  />
                </FormField>

                {/*  kata Sandi Baru */}
                <FormField label={'Kata Sandi baru'}>
                  <Input
                    id={'kata'}
                    value={formData.kata_sandi_baru}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, kata_sandi_baru: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.kata_sandi_baru ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Kata Sandi"
                    autoComplete="off"
                  />
                </FormField>

                <FormField label={'Kata Sandi'}>
                  <Input
                    id={'kata'}
                    value={formData.ulangi_kata_sandi}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, ulangi_kata_sandi: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.ulangi_kata_sandi ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Kata Sandi"
                    autoComplete="off"
                  />
                </FormField>
              </div>
              <div className={'w-1/2 flex flex-col gap-6'}></div>
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

    </>
  )
}


export default EditAnggota;
