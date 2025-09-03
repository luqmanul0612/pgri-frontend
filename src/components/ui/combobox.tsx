"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");
  const comboboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredOptions(filtered);
  }, [searchValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateDropdownPosition = () => {
    if (!triggerRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = Math.min(300, filteredOptions.length * 44 + 100); // Estimate dropdown height
    
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    
    // Use bottom position if there's enough space, otherwise use top
    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      setDropdownPosition("bottom");
    } else {
      setDropdownPosition("top");
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      if (!isOpen) {
        calculateDropdownPosition();
        setSearchValue("");
      }
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    onValueChange?.(option.value);
    setIsOpen(false);
    setSearchValue("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn("relative", className)} ref={comboboxRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400 focus:border-[#17a3b8] focus:outline-none focus:ring-2 focus:ring-[#17a3b8]/20",
          disabled && "cursor-not-allowed bg-gray-50 text-gray-500",
          isOpen && "border-[#17a3b8] ring-2 ring-[#17a3b8]/20",
        )}
      >
        <span
          className={cn(
            "text-sm",
            selectedOption ? "text-gray-900" : "text-[#919191]",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div 
          className={cn(
            "absolute z-50 w-full rounded-lg bg-white shadow-lg outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/50",
            dropdownPosition === "bottom" ? "mt-1 top-full" : "mb-1 bottom-full"
          )}
          style={{
            maxHeight: "min(300px, 40vh)",
          }}
        >
          <div className="flex flex-col gap-4 rounded-lg p-4">
            {/* Search Input */}
            <div className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 outline outline-1 outline-offset-[-1px] outline-gray-300">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="flex-1 text-sm font-normal text-[#919191] outline-none placeholder:text-[#919191]"
                autoFocus
              />
              <Search className="h-6 w-6 text-[#919191]" strokeWidth={1.5} />
            </div>

            {/* Options List */}
            <div 
              className="flex flex-col gap-px overflow-y-auto"
              style={{
                maxHeight: "min(200px, 25vh)",
              }}
            >
              {filteredOptions.length === 0 ? (
                <div className="flex h-11 items-center px-2.5 py-2.5 text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className="flex h-11 shrink-0 items-center gap-2.5 py-2.5 text-left text-sm font-normal text-[#17191c] transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="flex-1">{option.label}</div>
                    {/* Checkbox placeholder - matches Figma design */}
                    <div className="relative h-[18px] w-[18px] opacity-0">
                      <div className="absolute left-[3px] top-[4.50px] h-[8.25px] w-3 outline outline-2 outline-offset-[-1px] outline-[#17a3b8]" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
