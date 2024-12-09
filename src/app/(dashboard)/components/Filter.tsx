"use client";
import Card from "@/app/components/Card";
import SelectField from "@/app/components/SelectField";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { getCity, getDistrict, getProvinces } from "@/app/(dashboard)/anggota/serverActions/member";
import { IAdministrativeRegions, IAdministrativeRegionValue } from "@/interfaces/IAdministrativeRegions";

interface FilterProps {}

export const Filter: FC<FilterProps> = ({}) => {
  const [formData, setFormData] = useState<Record<any, any>>({});
  const [listProvinces, setListProvinces] = useState<IAdministrativeRegionValue[]>([]);
  const [listCity, setListCity] = useState<IAdministrativeRegionValue[]>([]);
  const [listDistrict, setListDistrict] = useState<IAdministrativeRegionValue[]>([])
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };


  useEffect(() => {
    (async () => {
      const getDataProvinces = await getProvinces();
      const getDataMapping : any = getDataProvinces.data.map(item => ({
        value: item.code,
        label: item.name,
      }))
      setListProvinces(getDataMapping)
    })()
  }, []);

  useEffect(() => {
    (async () => {
     if (formData.provinsi) {
       const getDataCity = await getCity(formData.provinsi);
       const getDataMapping: any = getDataCity.data.map(item => ({
         value: item.code,
         label: item.name,
       }));
       setListCity(getDataMapping);
     }
    })()
  }, [formData.provinsi]);

  useEffect(() => {
    (async () => {
      if (formData.kota) {
        const getDataDistrict = await getDistrict(formData.kota);
        const getDataMapping: any = getDataDistrict.data.map(item => ({
          value: item.code,
          label: item.name
        }));
        setListDistrict(getDataMapping)
      }
    } )()
  }, [formData.kota]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-row justify-between gap-5">
          <div className="w-full">
            <SelectField
              id="provinsi"
              label="Provinsi"
              value={formData.provinsi}
              onChange={handleSelectChange}
              // options={[
              //   { value: "jakarta", label: "Jakarta" },
              //   { value: "jawa barat", label: "Jawa Barat" },
              //   { value: "jawa timur", label: "Jawa Timur" },
              // ]}
              options={listProvinces}
              placeholder="Pilih Provinsi"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="kota"
              label="Kab/Kota"
              value={formData.kota}
              onChange={handleSelectChange}
              disabled={false}
              // options={[
              //   { value: "bogor", label: "Bogor" },
              //   { value: "semarang", label: "Semarang" },
              //   { value: "medan", label: "Medan" },
              // ]}
              options={listCity}
              placeholder="Pilih Kab/Kota"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="Kecamatan"
              label="Kecamatan"
              value={formData.kecamatan}
              onChange={handleSelectChange}
              // options={[
              //   { value: "ciawi", label: "Ciawi" },
              //   { value: "bogor kota", label: "Bogor Kota" },
              //   { value: "cigombong", label: "Cigombong" },
              // ]}
              options={listDistrict}
              placeholder="Pilih Kecamatan"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="status"
              label="Status Pegawai"
              value={formData.status}
              onChange={handleSelectChange}
              options={[
                { value: "PAUD", label: "PAUD" },
                { value: "TK", label: "TK" },
                { value: "Lainnya", label: "Lainnya" },
              ]}
              placeholder="Pilih Status Pegawai"
            />
          </div>

          <div className="flex w-full items-end justify-end">
            <Button className="w-full rounded-xl bg-primary" type="submit">
              Cek Data
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
