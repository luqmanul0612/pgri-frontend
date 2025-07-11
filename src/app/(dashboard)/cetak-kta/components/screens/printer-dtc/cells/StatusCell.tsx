import React from "react";

interface StatusCellProps {
  status: "active" | "inactive";
}

export const StatusCell: React.FC<StatusCellProps> = ({ status }) => {
  const isActive = status === "active";

  return (
    <div className="flex items-center">
      <div
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${
          isActive ? "bg-[#17a3b8]" : "bg-[#ff0000]"
        }`}
      >
        {isActive ? (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1 1L7 7M7 1L1 7"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};