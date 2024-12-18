"use client";

import React, { useEffect, useState } from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { IAdministrativeRegionValue } from "@/interfaces/IAdministrativeRegions";
import { getCity, getDistrict, getProvinces, getSubDistrict } from "@/app/(dashboard)/anggota/serverActions/member";
import ConfirmationEdit from "@/app/(dashboard)/anggota/component/ConfirmationEdit";
import { useRouter } from "next/navigation";

interface pageProps {
  params: {
    id: string;
  };
}

interface optionValue {
  label: string;
  value: string;
}

const EditAnggota: React.FC<pageProps> = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    npaLama: '',
    email: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    pendidikan: '',
    jenis_kelamin: '',
    agama: '',
    golongan_darah: '',
    alamat_ktp: '',
    kode_pos: '',
    nomor_handphone: '',


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

  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [checkBoxAgree, setCheckBoxAgree] = useState<boolean>(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [fileKtp, setFileKtp] = useState(null);
  const [previewURL, setPreviewURL] = useState<any>(null);
  const [previewKTP, setPreviewKTP] = useState<any>(null);
  const router = useRouter();

  const religions = [
    { label: "Islam", value: "islam" },
    { label: "Kristen Protestan", value: "protestan" },
    { label: "Kristen Katolik", value: "katolik" },
    { label: "Hindu", value: "hindu" },
    { label: "Buddha", value: "buddha" },
    { label: "Khonghucu", value: "khonghucu" }
  ];

  const bloodTypes = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "AB", value: "ab" },
    { label: "O", value: "o" }
  ];

  const genders = [
    { label: "Laki-laki", value: "laki-laki" },
    { label: "Perempuan", value: "perempuan" }
  ];

  const educations = [
    {
      label: "SMA/SMK",
      value: "SMA/SMK",
    },
    {
      label: "D3",
      value: "D3",
    },
    {
      label: "S1",
      value: "S1",
    },
    {
      label: "S2",
      value: "S2",
    },
    {
      label: "S3",
      value: "S3",
    }
  ]

  const [listProvinces, setListProvinces] = useState<IAdministrativeRegionValue[]>([])
  const [listCity, setListCity] = useState<IAdministrativeRegionValue[]>([])
  const [listDistrict, setListDistrict] = useState<IAdministrativeRegionValue[]>([])
  const [listSubDistrict, setListSubDistrict] = useState<IAdministrativeRegionValue[]>([])
  useEffect(() => {
    (async () => {
      const getDataProvinces = await getProvinces();
      const getDataMapping: any = getDataProvinces.data.map(item => ({
        value: item.code,
        label: item.name,
      }));
      setListProvinces(getDataMapping);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      if (formData.provinces) {
        const getDataCity = await getCity(formData.provinces);
        const getDataMapping: any = getDataCity.data.map(item => ({
          value: item.code,
          label: item.name,
        }));
        setListCity(getDataMapping);
      }
    })();
  }, [formData.provinces]);

  useEffect(() => {
    (async () => {
      if (formData.city) {
        const getDataDistrict = await getDistrict(formData.city);
        const getDataMapping: any = getDataDistrict.data.map(item => ({
          value: item.code,
          label: item.name,
        }));
        setListDistrict(getDataMapping);
      }
    })()
  }, [formData.city]);

  useEffect(() => {
    (async () => {
      if (formData.district) {
        const getDataSubDistrict = await getSubDistrict(formData.district);
        const gerDataMapping: any = getDataSubDistrict.data.map(item => ({
          value: item.code,
          label: item.name,
        }));
        setListSubDistrict(gerDataMapping);
      }
    })()
  }, [formData.district]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsModalConfirmationOpen(true);
  }

  const handleFileChange = (e: any, type: string) => {
    if (type === "poto") {
      const uploadFile = e.target.files[0];
      console.log(uploadFile);
      setFile(uploadFile);

      if (uploadFile) {
        const reader = new FileReader();
        reader.onload = () => setPreviewURL(reader.result);
        reader.readAsDataURL(uploadFile);
      }
    } else {
      const uploadFile = e.target.files[0];
      console.log(uploadFile);
      setFileKtp(uploadFile);

      if (uploadFile) {
        const reader = new FileReader();
        reader.onload = () => setPreviewKTP(reader.result);
        reader.readAsDataURL(uploadFile);
      }
    }
  }

  const handleButtonBack = () => {
    router.back()
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
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl bg-white'}>
            <div className={'flex gap-[26px]'}>
              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Nama & Gelar */}
                <FormField label={'Nama & Gelar'}>
                  <Input
                    id={'fullName'}
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, fullName: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.fullName ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Nama & Gelar"
                    autoComplete="off"
                  />
                </FormField>

                {/* Nik */}
                <FormField label={'NIK'}>
                  <Input
                    type={'number'}
                    id={'nik'}
                    value={formData.nik}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, nik: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 bg-transparent rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.nik ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan NIK"
                    autoComplete="off"
                  />
                </FormField>

                {/* NPA Lama */}
                <FormField label={'NPA Lama'}>
                  <Input
                    type={'number'}
                    id={'npaLama'}
                    value={formData.npaLama}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, npaLama: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.npaLama ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan NPA Lama"
                    autoComplete="off"
                  />
                </FormField>

                {/* Email */}
                <FormField label={'Email'}>
                  <Input
                    type={'email'}
                    id={'email'}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, email: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.email ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Email"
                    autoComplete="off"
                  />
                </FormField>

                {/* Tempat Lahir */}
                <FormField label={'Tempat Lahir'}>
                  <Input
                    type={'number'}
                    id={'tempatLahir'}
                    value={formData.tempat_lahir}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, tempat_lahir: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.tempat_lahir ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Tempat Lahir"
                    autoComplete="off"
                  />
                </FormField>

                {/* Tanggal Lahir */}
                <FormField label={'Tanggal Lahir'}>
                  <Input
                    type={'date'}
                    id={'tanggalLahir'}
                    value={formData.tanggal_lahir}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, tanggal_lahir: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.tanggal_lahir ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Tanggal Lahir"
                    autoComplete="off"
                  />
                </FormField>

              </div>
              <div className={'w-1/2 flex flex-col gap-6'}>
                {/* Pendidikan/Ijazah Terakhir */}
                <FormField label={'Pendidikan/Ijazah Terakhir'}>
                  <div className="relative">
                    <select
                      id="subdistrict"
                      value={formData.pendidikan}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, pendidikan: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.pendidikan
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      { educations.map((education) => (
                        <option key={education.value} value={education.value}>{ education.label }</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.pendidikan ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                {/* Jenis Kelamin */}
                <FormField label={'Jenis Kelamin'}>
                  <div className="relative">
                    <select
                      id="subdistrict"
                      value={formData.jenis_kelamin}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, jenis_kelamin: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.jenis_kelamin
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      { genders.map((gender) => (
                        <option key={gender.value} value={ gender.value }>{ gender.label }</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.jenis_kelamin ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                {/* Agama */}
                <FormField label={'Agama'}>
                  <div className="relative">
                    <select
                      id="subdistrict"
                      value={formData.agama}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, agama: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.agama
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      { religions.map((religion) => (
                        <option key={religion.value} value={religion.value}>{religion.label}</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.agama ? "text-[#17a3b8]" : "text-gray-400"}`}
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


                {/* Golongan Darah */}
                <FormField label={'Golongan Darah'}>
                  <div className="relative">
                    <select
                      id="subdistrict"
                      value={formData.golongan_darah}
                      onChange={(e) => {
                        setFormData((v) => {
                          return { ...v, golongan_darah: e.target.value };
                        });
                      }}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        formData.golongan_darah
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400",
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      {bloodTypes.map((bloodType) => (
                        <option key={bloodType.value} value={bloodType.value}>{ bloodType.label }</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.golongan_darah ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                {/* Alamat KTP */}
                <FormField label={'Alamat KTP'}>
                  <Input
                    id={'addressKtp'}
                    value={formData.alamat_ktp}
                    onChange={(e) => {
                      setFormData((v) => {
                        return { ...v, alamat_ktp: e.target.value };
                      })
                    }}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      formData.alamat_ktp ? "border-[#17a3b8]/20" : "border-gray-300",
                    )}
                    placeholder="Masukkan Alamat KTP"
                    autoComplete="off"
                  />
                </FormField>

                {/* Kode Pos dan Nomor Handphone */}
                <div className={'flex gap-4'}>
                  <div className={'w-1/2'}>
                    {/* Kode Pos */}
                    <FormField label={'Kode Pos'}>
                      <Input
                        id={'kodePost'}
                        type={'number'}
                        value={formData.kode_pos}
                        onChange={(e) => {
                          setFormData((v) => {
                            return { ...v, kode_pos: e.target.value };
                          })
                        }}
                        className={clsx(
                          "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                          formData.kode_pos ? "border-[#17a3b8]/20" : "border-gray-300",
                        )}
                        placeholder="Masukkan Kode Pos"
                        autoComplete="off"
                      />
                    </FormField>
                  </div>
                  <div className={'w-1/2'}>
                    {/* Nomor Handphone */}
                    <FormField label={'Nomor Handphone'}>
                      <Input
                        id={'nomorHandphone'}
                        type={'number'}
                        value={formData.nomor_handphone}
                        onChange={(e) => {
                          setFormData((v) => {
                            return { ...v, nomor_handphone: e.target.value };
                          })
                        }}
                        className={clsx(
                          "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                          formData.nomor_handphone ? "border-[#17a3b8]/20" : "border-gray-300",
                        )}
                        placeholder="Masukkan Nomor Handphone"
                        autoComplete="off"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Pekerjaan */}
        <div id={'dataPekerjaan'} className={'flex flex-col gap-4 mb-4'}>
          {/*  Judul Data Pekerjaan */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>2</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Pekerjaan</h2>
          </div>

          {/* Form Data Pekerjaan */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl bg-white'}>
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
                    disabled={false}
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
                    { listProvinces.map((province) => (
                      <option key={province.value} value={province.value}>{ province.label }</option>
                    ))}
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.provinces ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                    disabled={!formData.provinces}
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
                    { listCity.map((city) => (
                      <option key={city.value} value={city.value}>{city.label}</option>
                    ))}

                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.city ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                    disabled={!formData.city}
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
                    { listDistrict.map((district) => (
                      <option key={district.value} value={district.value}>{ district.label }</option>
                    ))}
                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.district ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                    disabled={!formData.district}
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
                    { listSubDistrict.map((subDistrict) => (
                      <option key={subDistrict.value} value={subDistrict.value}>{subDistrict.label}</option>
                    ))}

                  </select>
                  <svg
                    className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.subdistrict ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.pekerjaan ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.status_pegawai ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.setifikat_pendidik ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.jenjang_mengajar ? "text-[#17a3b8]" : "text-gray-400"}`}
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

        {/* Data Poto & E-KTP */}
        <div id={'dataPotoDanKtp'} className={'flex flex-col gap-4 mb-4'}>
          {/*  Judul Data Pekerjaan */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>3</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Data Foto & E-KTP</h2>
          </div>

          {/* Form Data Pekerjaan */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl bg-white'}>
            <div className={"flex gap-[26px]"}>
              <div className={"w-1/2 flex flex-col gap-6"}>
                <div className={"flex gap-4"}>
                  <div className={"w-4/12"}>
                    <img className={"h-[223px] object-cover rounded-2xl overflow-hidden"} height={"223"}
                         src={previewURL ? previewURL : "/assets/default-image.png"} />
                  </div>
                  <div className={"w-8/12"}>
                    <img className={"h-[223px] w-full object-cover rounded-2xl overflow-hidden"} height={"223"}
                         src={previewKTP ? previewKTP : "/assets/default-image.png"} />
                  </div>
                </div>
              </div>
              <div className={"w-1/2 flex flex-col gap-6"}>
                <FormField label={"Upload Poto"}>
                  <Input type={"file"} onChange={(e) => handleFileChange(e, 'poto')} />
                </FormField>
                <FormField label={"Upload KTP"}>
                  <Input type={"file"} onChange={(e) => handleFileChange(e, "ktp")} />
                </FormField>
              </div>
            </div>
          </div>
        </div>

        {/* Kata Sandi */}
        <div id={"dataKataSandi"} className={"flex flex-col gap-4"}>
          {/*  Judul Data Kata Sandi */}
          <div className={"flex items-center gap-2.5"}>
            <span className={'w-[34px] h-[34px] bg-[#17A3B8] flex justify-center items-center text-white rounded-full'}>4</span>
            <h2 className={'text-[14px] text-[#17A3B8]'}>Kata Sandi</h2>
          </div>

          {/* Form Data Kata Sandi */}
          <div className={'border border-[#17A3B8] border-opacity-20 p-4 rounded-2xl bg-white'}>
            <div className={'flex flex-col gap-6'}>
              {/* Kata Sandi */}
              <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
                <Label htmlFor="password">Kata Sandi</Label>
                <input
                  value={formData.kata_sandi}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...formData, kata_sandi: e.target.value };
                    });
                  }}
                  type={showPassword ? "text" : "password"}
                  id="password"
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

              {/* Kata Sandi Baru */}
              <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
                <Label htmlFor="PasswordNew">Password Baru</Label>
                <input
                  value={formData.kata_sandi_baru}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...formData, kata_sandi_baru: e.target.value };
                    });
                  }}
                  type={showPasswordNew ? "text" : "password"}
                  id="PasswordNew"
                  className="flex w-full items-center gap-2.5 rounded-2xl border border-[#17a3b8]/20 py-3 pl-4 pr-10"
                  placeholder="Masukkan Password"
                />
                <div
                  className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer"
                  onClick={() => setShowPasswordNew(!showPasswordNew)}
                >
                  {showPasswordNew ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </div>
              </div>

              {/*  Ulangi Kata Sandi */}
              <div className="relative flex flex-col items-start justify-start gap-2.5 self-stretch">
                <Label htmlFor="passwordConfirm">Kata Sandi</Label>
                <input
                  value={formData.ulangi_kata_sandi}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...formData, ulangi_kata_sandi: e.target.value };
                    });
                  }}
                  type={showPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  className="flex w-full items-center gap-2.5 rounded-2xl border border-[#17a3b8]/20 py-3 pl-4 pr-10"
                  placeholder="Masukkan Password"
                />
                <div
                  className="absolute right-3 top-[65%] translate-y-[-50%] cursor-pointer"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPasswordConfirm ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Submit */}
        <div className={"flex justify-between mt-4"}>
          <div className={"flex items-center flex-row gap-2.5"}>
            <input
              value={checkBoxAgree}
              onChange={(e) => {
                setCheckBoxAgree(e.target.checked);
              }}
              type={"checkbox"}
              id={"relegion"}
            />
            <p className={"text-[14px]"}>Data yang saya ubah sudah sesui</p>
          </div>
          <div className={'flex'}>
            <div className="flex gap-4">
              <Button onClick={handleButtonBack}
                className="w-[200px] rounded-2xl bg-[#ff0000] text-[16px]"
              >
                Batal
              </Button>
              <Button
                className="w-[200px] rounded-2xl bg-[#17a3b8]"
                type="submit"
                disabled={!checkBoxAgree}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </form>
      {
        <ConfirmationEdit
          isOpen={isModalConfirmationOpen}
          onClose={() => setIsModalConfirmationOpen(false)}
        />
      }
    </>
  )
};


export default EditAnggota;
