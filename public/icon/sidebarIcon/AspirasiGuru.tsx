import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface AspirasiGuruProps {
  on?: boolean;
}

export const AspirasiGuru: FC<AspirasiGuruProps> = ({ on }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 12V6C19 3.79 19 2 15 2H9C5 2 5 3.79 5 6V12"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5498 9.22998H13.8798"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.71973 6.22998H14.7197"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
