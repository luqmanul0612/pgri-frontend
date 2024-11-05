"use client";
import Card from "@/app/components/Card";
import SelectField from "@/app/components/SelectField";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FC, useState } from "react";

interface FilterProps {}

export const Filter: FC<FilterProps> = ({}) => {
  const [formData, setFormData] = useState<Record<any, any>>({});

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  return (
    <Card className="p-4">
      <form>
        <div className="flex w-full flex-row justify-between gap-5">
          <div className="w-full">
            <SelectField
              id="provinsi"
              label="Provinsi"
              value={formData.provinsi}
              onChange={handleSelectChange}
              options={[
                { value: "jakarta", label: "Jakarta" },
                { value: "jawa barat", label: "Jawa Barat" },
                { value: "jawa timur", label: "Jawa Timur" },
              ]}
              placeholder="Pilih Provinsi"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="kota"
              label="Kab/Kota"
              value={formData.kota}
              onChange={handleSelectChange}
              options={[
                { value: "bogor", label: "Bogor" },
                { value: "semarang", label: "Semarang" },
                { value: "medan", label: "Medan" },
              ]}
              placeholder="Pilih Kab/Kota"
            />
          </div>

          <div className="w-full">
            <SelectField
              id="Kecamatan"
              label="Kecamatan"
              value={formData.kecamatan}
              onChange={handleSelectChange}
              options={[
                { value: "ciawi", label: "Ciawi" },
                { value: "bogor kota", label: "Bogor Kota" },
                { value: "cigombong", label: "Cigombong" },
              ]}
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
