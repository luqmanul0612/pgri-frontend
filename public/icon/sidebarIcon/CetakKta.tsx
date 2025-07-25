import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface CetakKtaProps {
  on?: boolean;
  //! terapkan custom color di component ini
  customColor?: "#17191c" | "#17a3b8";
}

export const CetakKta: FC<CetakKtaProps> = ({ on, customColor }) => {
  // Pilih warna stroke: customColor > on ? colorOn : colorOff
  const strokeColor = customColor ? customColor : on ? colorOn : colorOff;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7.25 7H16.75V5C16.75 3 16 2 13.75 2H10.25C8 2 7.25 3 7.25 5V7Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15V19C16 21 15 22 13 22H11C9 22 8 21 8 19V15H16Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10V15C21 17 20 18 18 18H16V15H8V18H6C4 18 3 17 3 15V10C3 8 4 7 6 7H18C20 7 21 8 21 10Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 15H15.79H7"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11H10"
        stroke={strokeColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
