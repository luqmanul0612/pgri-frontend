import React from "react";

interface YesNoCellProps {
  value: boolean;
}

export const YesNoCell: React.FC<YesNoCellProps> = ({ value }) => {
  return (
    <div className="flex-1 justify-start text-center text-xs font-normal text-[#17191c]">
      {value ? "YA" : "TIDAK"}
    </div>
  );
};