import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface karyaguruProps {
  on?: boolean;
}

export const KaryaGuru: FC<karyaguruProps> = ({ on }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7 20.168V13L11 6L15 13V20.168"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13C7 13 8.127 14 9 14C9.873 14 11 13 11 13C11 13 12.127 14 13 14C13.873 14 15 13 15 13"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
