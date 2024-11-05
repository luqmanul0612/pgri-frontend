import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface permohonanProps {
  on?: boolean;
}

export const permohonan: FC<permohonanProps> = ({ on }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M17 0C17.5523 0 18 0.44772 18 1V4.757L16 6.757V2H2V18H16V15.242L18 13.242V19C18 19.5523 17.5523 20 17 20H1C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H17ZM18.7782 6.80761L20.1924 8.2218L12.4142 16L10.9979 15.9979L11 14.5858L18.7782 6.80761ZM10 10V12H5V10H10ZM13 6V8H5V6H13Z"
        fill={on ? colorOn : colorOff}
      />
    </svg>
  );
};
