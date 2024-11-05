import clsx from "clsx";
import React, { ChangeEvent } from "react";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={clsx(
            "w-full appearance-none rounded-lg border border-[#17a3b8]/20 bg-transparent py-[8px] pl-4 pr-10 focus:border-[#17a3b8] focus:outline-none text-sm",
            !value ? "text-mutedText border-mutedBorder" : "text-[#17a3b8]",
          )}
        >
          {[{ value: "", label: placeholder }, ...options].map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Filled triangle icon */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <svg
            className={clsx(
              "size-6 fill-current",
              !value ? "text-mutedText border-mutedText" : "text-[#17a3b8]",
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.5 7.5l4.5 4.5 4.5-4.5h-9z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;
