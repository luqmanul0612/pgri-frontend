"use client";

import React from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { register } from "next/dist/client/components/react-dev-overlay/pages/client";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KeyValuePair } from "tailwindcss/types/config";
import { Button } from "@/components/ui/button";

interface IAddPelatihan {
}

type FormInputPelatihan = {
  tanggalPelatihan: Date,
  biayaPelatihan: string,
  judulPelatihan: string,
  deskripsiPelatihan: string,
  tempatPelatihan: string,
  sertifikatPelatihan: string,
  kuotaPelatihan: string,
};

const submit: SubmitHandler<FormInputPelatihan> = (data) => {
  console.log("submit");
  console.log(data);
};

const AddPelatihan: React.FC<IAddPelatihan> = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormInputPelatihan>();

  const listKuotaPelatihan: KeyValuePair[] = [
    {
      value: "50",
      label: "50"
    },
    {
      value: "100",
      label: "100"
    },
    {
      value: "500",
      label: "500"
    }
  ];

  const listSertifikatPelatihan: KeyValuePair[] = [
    {
      value: "01",
      label: "Ada"
    },
    {
      value: "02",
      label: "Tidak Ada"
    }
  ];

  const listTempatPelatihan: KeyValuePair[] = [
    {
      value: "01",
      label: "Jakarta"
    },
    {
      value: "02",
      label: "Bandung"
    },
    {
      value: "03",
      label: "Sukabumi"
    }
  ];

  return (
    <>
      <div className={'mb-4'}>
        <h2 className={"text-primary font-medium"}>Tambah Pelatihan</h2>
      </div>

      <div className={"border border-primary border-opacity-20 p-4 rounded-2xl bg-white"}>
        <div className={'flex gap-6 mb-6'}>
          <img className={'w-1/2'} src='/assets/pelatihan.png' />
        </div>
        <form className={""}
              onSubmit={handleSubmit(submit)}>
          <div className={'mb-4'}>
            <FormField label={"Unggah Benner Pelatihan"}>
              <Input
                type={"file"}
                placeholder={"File"}
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl text-[#17a3b8]",
                  errors.tanggalPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
                )}
              />
            </FormField>
          </div>
          <div className={"flex gap-6"}>
            <div className={"w-1/2"}>
              <div className={"flex flex-col gap-4"}>
                <FormField label={"Tanggal Pelatihan"}>
                  <Input
                    {...register("tanggalPelatihan")}
                    type={"date"}
                    placeholder={"Masukkan Tanggal Lahir"}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      errors.tanggalPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
                    )}
                  />
                </FormField>

                <FormField label={"Biaya Pelatihan"}>
                  <Input
                    {...register("biayaPelatihan")}
                    type={"text"}
                    placeholder={"Masukan Biaya Pelatihan"}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      errors.biayaPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
                    )}
                  />
                </FormField>

                <FormField label={"Judul Pelatihan"}>
                  <Input
                    {...register("judulPelatihan")}
                    type={"text"} placeholder={"Masukan Judul Pelatihan"}
                    className={clsx(
                      "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                      errors.judulPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
                    )}
                  />
                </FormField>
              </div>
            </div>
            <div className={"w-1/2"}>
              <div className={"flex flex-col gap-4"}>
                <FormField label={"Tempat Pelatihan"}>
                  <div className={"relative"}>
                    <select
                      {...register("tempatPelatihan")}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        errors.tempatPelatihan
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400"
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      {listTempatPelatihan.map((items, index) => (
                        <option key={index} value={items.value}>{items.label}</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${errors.tempatPelatihan ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                <FormField label={"Sertifikat Pelatihan"}>
                  <div className={"relative"}>
                    <select
                      {...register("sertifikatPelatihan")}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        errors.sertifikatPelatihan
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400"
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      {listSertifikatPelatihan.map((items, index) => (
                        <option key={index} value={items.value}>{items.label}</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${errors.sertifikatPelatihan ? "text-[#17a3b8]" : "text-gray-400"}`}
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

                <FormField label={"Kuota Pelatihan"}>
                  <div className={"relative"}>
                    <select
                      {...register("kuotaPelatihan")}
                      className={clsx(
                        "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                        errors.kuotaPelatihan
                          ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                          : "border border-gray-300 text-gray-400"
                      )}
                    >
                      <option value="" disabled>
                        Pilih...
                      </option>
                      {listKuotaPelatihan.map((items, index) => (
                        <option key={index} value={items.value}>{items.label}</option>
                      ))}
                    </select>
                    <svg
                      className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${errors.kuotaPelatihan ? "text-[#17a3b8]" : "text-gray-400"}`}
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
              </div>
            </div>
          </div>
          <FormField label={"Deskripsi"}>
            <textarea
              className={"border border-primary border-opacity-20 rounded-2xl py-3 pl-4"}
              placeholder={"Masukan Deskripsi"}
            />
          </FormField>
          <div className={"flex mt-6 gap-6 justify-end"}>
            <Button
              className="w-[200px] rounded-2xl bg-[#ff0000] text-[16px]"
            >
              Batal
            </Button>
            <Button
              className="w-[200px] rounded-2xl bg-[#17a3b8]"
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPelatihan;
