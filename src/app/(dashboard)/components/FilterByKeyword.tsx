"use client";
import SelectFieldWithBg from "@/app/components/SelectFieldWithBg";
import { FC, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface FilterByKeywordProps {}

const options = [
  { value: "", label: "Semua Anggota" },
  { value: "verified", label: "Terverifikasi" },
  { value: "unverified", label: "Belum Terverifikasi" },
  { value: "inactive", label: "Nonaktif" },
];

export const FilterByKeyword: FC<FilterByKeywordProps> = ({}) => {
  const [formData, setFormData] = useState<{ filterByStatus: string }>({
    filterByStatus: "",
  });

  const handleSelectChange = (value: string) => {
    setFormData({ filterByStatus: value });
  };

  return (
<div className="w-52 h-[37px]">
      <Listbox value={formData.filterByStatus} onChange={handleSelectChange}>
        <div className="relative">
          <ListboxButton className="w-full cursor-pointer rounded-lg  h-[37px] px-4 text-left focus:outline-none sm:text-sm border border-primary bg-primary text-white">
            {options.find((option) => option.value === formData.filterByStatus)?.label || "Pilih Status"}
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black/80 py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <ListboxOption
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-black/80 text-white/90" : "text-white/90"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                          {/* Optional checkmark icon */}
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
