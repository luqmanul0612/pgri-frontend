"use client";

import React, { useState } from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { register } from "next/dist/client/components/react-dev-overlay/pages/client";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KeyValuePair } from "tailwindcss/types/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { reader } from "next/dist/experimental/testmode/fetch";

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
  const router = useRouter();

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

  const handleback = () => {
    console.log('hello world');
    router.back();
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [previewFile, setPreviewFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setSelectedName(file.name)

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewFile(reader.result);
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div className={'mb-4'}>
        <h2 className={"text-primary font-medium"}>Tambah Pelatihan</h2>
      </div>

      <div className={"border border-primary border-opacity-20 p-4 rounded-2xl bg-white"}>
        <form className={"flex flex-col"}
              onSubmit={handleSubmit(submit)}>
          {/*  Image Preview */}
          <div className={"flex gap-6 mb-6"}>
            {/*<img className={'w-1/2'} src='/assets/pelatihan.png' />*/}
            <img className={"w-1/2 rounded-2xl"} src={previewFile ?? "/assets/default-image.png" } />
          </div>
          <div className={"mb-4"}>
            <FormField label={"Unggah Benner Pelatihan"}>
              <div className={clsx(
                "flex items-center gap-2.5 rounded-2xl text-[#17a3b8] border relative w-full py-2.5 px-4",
                errors.tanggalPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
              )}>
                { selectedName ? (
                  <p className={'text-sm'}>{ selectedName }</p>
                ) : (
                  <p className={'text-sm text-gray-300'}>Masukan Benner Pelatihan</p>
                ) }
                <Input
                  type={"file"}
                  placeholder={"File"}
                  className={'opacity-0 absolute top-0 left-0 w-full h-full'}
                  onChange={handleFileChange}
                  accept={'image/png, image/jpeg'}
                  // className={clsx(
                  //   "flex items-center gap-2.5 rounded-2xl text-[#17a3b8]",
                  //   errors.tanggalPelatihan ? "border-[#17a3b8]/20" : "border-gray-300"
                  // )}
                />

                <span className={'absolute right-[10px] top-1/2 -translate-y-1/2'}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.6799 16.9599L18.5499 9.64988C17.4899 7.16988 15.5399 7.06988 14.2299 9.42988L12.3399 12.8399C11.3799 14.5699 9.58993 14.7199 8.34993 13.1699L8.12993 12.8899C6.83993 11.2699 5.01993 11.4699 4.08993 13.3199L2.36993 16.7699C1.15993 19.1699 2.90993 21.9999 5.58993 21.9999H18.3499C20.9499 21.9999 22.6999 19.3499 21.6799 16.9599Z"
                      stroke="#919191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M6.96973 8C8.62658 8 9.96973 6.65685 9.96973 5C9.96973 3.34315 8.62658 2 6.96973 2C5.31287 2 3.96973 3.34315 3.96973 5C3.96973 6.65685 5.31287 8 6.96973 8Z"
                      stroke="#919191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
              </div>

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
              onClick={handleback}
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
