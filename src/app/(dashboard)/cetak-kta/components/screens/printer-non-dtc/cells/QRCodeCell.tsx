import React from "react";

export const QRCodeCell: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="relative h-6 w-6 overflow-hidden rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8]">
        <div className="absolute left-[3px] top-[3px] h-[18px] w-[18px] bg-[#17191c]" />
      </div>
    </div>
  );
};