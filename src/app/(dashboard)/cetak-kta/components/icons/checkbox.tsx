import { FC, useRef, useEffect } from "react";

interface CheckboxProps {
  strokeColor?: "#F5F7FB" | "#17191c";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  strokeColor = "#F5F7FB",
  onChange,
  className = "",
  checked,
  indeterminate,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={`relative inline-flex h-[24px] w-[24px] cursor-pointer items-center justify-center ${className}`}
    >
      {/* Native checkbox */}
      <input
        ref={inputRef}
        type="checkbox"
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={onChange}
        checked={checked}
      />

      {/* Default (unchecked) SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="peer-checked:hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 12L10.5 15.5L17 9"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="origin-center scale-0 transition-transform duration-200 peer-checked:scale-100"
        />
      </svg>

      {/* Checked (active) SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          fill="#DB3E36"
        />
        <path
          d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
};
