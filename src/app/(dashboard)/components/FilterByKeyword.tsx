"use client";
import SelectFieldWithBg from "@/app/components/SelectFieldWithBg";
import { FC, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdArrowDropdown } from "react-icons/io";


interface FilterByKeywordProps {
  filterByStatusProps: any;
}

const options = [
  { value: "", label: "Semua Anggota" },
  { value: "0", label: "Belum Terverifikasi" },
  { value: "1", label: "Terverifikasi" },
  { value: "2", label: "Nonaktif" },
];

export const FilterByKeyword: FC<FilterByKeywordProps> = ({ filterByStatusProps }) => {
  const [formData, setFormData] = useState<{ filterByStatus: string }>({
    filterByStatus: "",
  });
  const [isOpen, setIsOpen] = useState(false);


  const handleSelectChange = (value: string) => {
    setFormData({ filterByStatus: value });
    setIsOpen(false);
    filterByStatusProps(value);
  };

  return (
<div className="w-48 h-[37px]">
      <Listbox value={formData.filterByStatus} onChange={handleSelectChange}>
        <div className="relative">
          <ListboxButton className="w-full cursor-pointer rounded-lg h-[37px] px-4 text-left focus:outline-none sm:text-sm border border-primary bg-primary text-white flex items-center justify-between">
            <span>
              {options.find((option) => option.value === formData.filterByStatus)?.label ||
                "Pilih Status"}
            </span>
            <IoMdArrowDropdown className="ml-2 h-5 w-5 text-white" />
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
