import React, { useState } from "react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionId: string, optionValue: string) => {
    onChange(optionId, optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-fit">
      {/* Trigger for dropdown */}
      <div
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex cursor-pointer items-center justify-between gap-7 rounded-lg bg-primary h-[40px] pl-4 pr-2 text-white text-sm", // Added gap here
        )}
      >
        <span>
          {options.find((option) => option.value === value)?.label ||
            options[0].label}
        </span>
        <svg
          className={clsx(
            "h-5 w-5 fill-current",
            isOpen ? "rotate-180" : "rotate-0",
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7.5l4.5 4.5 4.5-4.5h-9z" />
        </svg>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <ul className="absolute top-full z-10 mt-1 w-full py-1 rounded-lg bg-black/90 shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(id, option.value)}
              className="cursor-pointer px-4 py-2 text-white/90 hover:text-primary text-sm transition-all duration-300"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
