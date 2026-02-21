"use client";
import Card from "@/app/components/Card";
import SelectField from "@/app/components/SelectField";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  getCity,
  getDistrict,
  getProvinces,
} from "@/app/(dashboard)/anggota/serverActions/member";
import {
  IAdministrativeRegions,
  IAdministrativeRegionValue,
} from "@/interfaces/IAdministrativeRegions";
import { EmployeeType } from "@/enum/EmployeeType";
import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";

interface FilterProps {
  filterRegions?: any;
}

export const Filter: FC<FilterProps> = ({ filterRegions }) => {
  const [formData, setFormData] = useState<Record<any, any>>({
    provinsi: null,
    kota: null,
    kecamatan: null,
    status: null,
  });

  const [listProvinces, setListProvinces] = useState<
    IAdministrativeRegionValue[]
  >([]);
  const [listCity, setListCity] = useState<IAdministrativeRegionValue[]>([]);
  const [listDistrict, setListDistrict] = useState<
    IAdministrativeRegionValue[]
  >([]);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const ListEmployeeStatus: IAdministrativeRegionValue[] = Object.values(
    EmployeeType,
  ).map((type) => ({
    label: type,
    value: type,
  }));

  useEffect(() => {
    (async () => {
      const getDataProvinces = await getProvinces();
      const getDataMapping: any = getDataProvinces.data.map((item) => ({
        value: item.code,
        label: item.name,
      }));
      setListProvinces(getDataMapping);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (formData.provinsi) {
        const getDataCity = await getCity(formData.provinsi);
        const getDataMapping: any = getDataCity.data.map((item) => ({
          value: item.code,
          label: item.name,
        }));
        setListCity(getDataMapping);
      }
    })();
  }, [formData.provinsi]);

  useEffect(() => {
    (async () => {
      if (formData.kota) {
        const getDataDistrict = await getDistrict(formData.kota);
        const getDataMapping: any = getDataDistrict.data.map((item) => ({
          value: item.code,
          label: item.name,
        }));
        setListDistrict(getDataMapping);
      }
    })();
  }, [formData.kota]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // filterRegions(formData);
    useModalUnderDevelopment.getState().setOpenModalUnderDevelopment(true);
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-row justify-between gap-5">
          <div className="w-full">
            <SelectField
              id="provinsi"
              label="Provinsi"
              value={formData.provinsi || ""}
              onChange={handleSelectChange}
              options={listProvinces}
              placeholder="Pilih Provinsi"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="kota"
              label="Kab/Kota"
              value={formData.kota || ""}
              onChange={handleSelectChange}
              disabled={!formData.provinsi}
              options={listCity}
              placeholder="Pilih Kab/Kota"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="kecamatan"
              label="Kecamatan"
              value={formData.kecamatan || ""}
              disabled={!formData.kota}
              onChange={handleSelectChange}
              options={listDistrict}
              placeholder="Pilih Kecamatan"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="status"
              label="Status Pegawai"
              value={formData.status || ""}
              onChange={handleSelectChange}
              options={ListEmployeeStatus}
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
