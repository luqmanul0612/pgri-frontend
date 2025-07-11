import { FC } from "react";

interface LogoutProps {}

export const Logout: FC<LogoutProps> = ({}) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M1 20C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H15C15.5523 0 16 0.44772 16 1V4H14V2H2V18H14V16H16V19C16 19.5523 15.5523 20 15 20H1ZM14 14V11H7V9H14V6L19 10L14 14Z"
        fill="#CB2929"
      />
    </svg>
  );
};
