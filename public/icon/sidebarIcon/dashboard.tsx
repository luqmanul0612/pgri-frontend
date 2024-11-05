import { FC } from "react";
import { colorOff, colorOn } from "./color";

interface dashboardProps {
  on?: boolean;
}

export const dashboard: FC<dashboardProps> = ({ on }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M0 9C0 9.5523 0.44772 10 1 10H7C7.5523 10 8 9.5523 8 9V1C8 0.44772 7.5523 0 7 0H1C0.44772 0 0 0.44772 0 1V9ZM0 17C0 17.5523 0.44772 18 1 18H7C7.5523 18 8 17.5523 8 17V13C8 12.4477 7.5523 12 7 12H1C0.44772 12 0 12.4477 0 13V17ZM10 17C10 17.5523 10.4477 18 11 18H17C17.5523 18 18 17.5523 18 17V9C18 8.4477 17.5523 8 17 8H11C10.4477 8 10 8.4477 10 9V17ZM11 0C10.4477 0 10 0.44772 10 1V5C10 5.55228 10.4477 6 11 6H17C17.5523 6 18 5.55228 18 5V1C18 0.44772 17.5523 0 17 0H11Z"
        fill={on ? colorOn : colorOff}
      />
    </svg>
  );
};
