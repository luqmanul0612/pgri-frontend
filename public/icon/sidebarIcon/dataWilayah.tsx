import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface dataWilayahProps {
  on?: boolean;
}

export const DataWilayah: FC<dataWilayahProps> = ({ on }) => {
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
        stroke={on ? colorOn : colorOff}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M22 9v6c0 2.5-.5 4.25-1.62 5.38L14 14l7.73-7.73c.18.79.27 1.69.27 2.73Z"
      />
      <path
        stroke={on ? colorOn : colorOff}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21.73 6.27 6.27 21.73C3.26 21.04 2 18.96 2 15V9c0-5 2-7 7-7h6c3.96 0 6.04 1.26 6.73 4.27Z"
      />
      <path
        stroke={on ? colorOn : colorOff}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.38 20.38C19.25 21.5 17.5 22 15 22H9c-1.04 0-1.94-.09-2.73-.27L14 14l6.38 6.38Z"
      />
      <path
        stroke={on ? colorOn : colorOff}
        strokeWidth={2}
        d="M6.241 7.98c.68-2.93 5.08-2.93 5.76 0 .39 1.72-.69 3.18-1.64 4.08a1.8 1.8 0 0 1-2.48 0c-.95-.9-2.04-2.36-1.64-4.08Z"
      />
      <path
        stroke={on ? colorOn : colorOff}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.096 8.7h.01"
      />
    </svg>
  );
};
