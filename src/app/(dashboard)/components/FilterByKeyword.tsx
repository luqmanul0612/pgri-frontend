"use client";
import SelectFieldWithBg from "@/app/components/SelectFieldWithBg";
import { FC, useState } from "react";

interface FilterByKeywordProps {}

export const FilterByKeyword: FC<FilterByKeywordProps> = ({}) => {
  const [formData, setFormData] = useState<Record<any, any>>({});

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  return (
    <div>
      <SelectFieldWithBg
        id="filterByStatus"
        onChange={handleSelectChange}
        value={formData.filterByStatus}
        options={[
          { value: "", label: "Semua Anggota" },
          { value: "", label: "Terverifikasi" },          
          { value: "", label: "Belum Terverifikasi" },
          { value: "", label: "Nonaktif" },
        ]}
      />
    </div>
  );
};
