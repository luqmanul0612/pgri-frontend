import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface PerlindunganGuruProps {
  on?: boolean;
}

export const PerlindunganGuru: FC<PerlindunganGuruProps> = ({ on }) => {
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
        d="M10.4901 2.23006L5.50015 4.10005C4.35015 4.53005 3.41016 5.89004 3.41016 7.12004V14.55C3.41016 15.73 4.19017 17.28 5.14017 17.99L9.44016 21.2001C10.8502 22.2601 13.1701 22.2601 14.5801 21.2001L18.8802 17.99C19.8302 17.28 20.6101 15.73 20.6101 14.55V7.12004C20.6101 5.89004 19.6701 4.53005 18.5201 4.10005L13.5302 2.23006C12.6802 1.92006 11.3201 1.92006 10.4901 2.23006Z"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9997 10.92C11.9597 10.92 11.9097 10.92 11.8697 10.92C10.9297 10.89 10.1797 10.11 10.1797 9.16003C10.1797 8.19003 10.9697 7.40002 11.9397 7.40002C12.9097 7.40002 13.6997 8.19003 13.6997 9.16003C13.6897 10.12 12.9397 10.89 11.9997 10.92Z"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.01 13.7201C9.05004 14.3601 9.05004 15.4101 10.01 16.0501C11.1 16.7801 12.89 16.7801 13.98 16.0501C14.94 15.4101 14.94 14.3601 13.98 13.7201C12.9 12.9901 11.11 12.9901 10.01 13.7201Z"
        stroke={on ? colorOn : colorOff}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
