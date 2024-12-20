import React from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";

interface IAddPelatihan {}

const AddPelatihan: React.FC<IAddPelatihan> = () => {
  return (
    <>
      <h1>Hello World</h1>
      <div className={'border border-primary border-opacity-20 p-4 rounded-2xl'}>
      <form className={"flex"}>
        <div className={"w-1/2"}>
          <div className={'flex flex-col gap-4'}>
            <FormField label={"Tanggal Pelatihan"} >
              <Input
                type={'date'}
                placeholder={'Masukkan Tanggal Lahir'}
              />
            </FormField>

            <FormField label={'Biaya Pelatihan'} >
              <Input type={'text'} placeholder={'Masukan Biaya Pelatihan'} />
            </FormField>

            <FormField label={'Judul Pelatihan'} >
              <Input type={'text'} placeholder={'Masukan Judul Pelatihan'} />
            </FormField>
          </div>
        </div>
        <div className={"w-1/2"}>
          <FormField label={'Tempat Pelatihan'}>
            <Input type={'text'} placeholder={'Masukan Tempat Pelatihan'} />
          </FormField>
          {/*<FormField label={'Sertifikat Pelatihan'} >*/}
          {/*</FormField>*/}
        </div>
      </form>
      </div>
    </>
  );
}

export  default AddPelatihan;
