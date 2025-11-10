import React from "react";
import { CetakKta } from "../../../../../../../../public/icon/sidebarIcon/CetakKta";
import { CetakKtaTableData } from "../types";

interface ActionCellProps {
  data: CetakKtaTableData;
  onCR80Click?: (data: CetakKtaTableData) => void;
  onCR79Click?: (data: CetakKtaTableData) => void;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  data,
  onCR80Click,
  onCR79Click,
}) => {
  return (
    <div className="flex flex-1 items-center justify-start gap-2">
      <div className="flex flex-1 items-center justify-center gap-2 px-2.5 py-1">
        <CetakKta customColor="#17191c" />
        <button
          onClick={() => onCR80Click?.(data)}
          className="justify-start text-xs font-normal text-[#17191c]"
        >
          CR80
        </button>
      </div>
      <div className="mx-1 h-6 w-px bg-[#ff0000]" />
      <div className="flex flex-1 items-center justify-center gap-2 px-2.5 py-1">
        <CetakKta customColor="#17a3b8" />
        <button
          onClick={() => onCR79Click?.(data)}
          className="justify-start text-xs font-normal text-[#17a3b8]"
        >
          CR79
        </button>
      </div>
    </div>
  );
};
