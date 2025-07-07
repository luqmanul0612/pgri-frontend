import React from "react";
import { CetakKta } from "../../../../../../public/icon/sidebarIcon/CetakKta";

interface ActionCellProps {
  onCR80Click?: () => void;
  onCR79Click?: () => void;
}

export const ActionCell: React.FC<ActionCellProps> = ({
  onCR80Click,
  onCR79Click,
}) => {
  return (
    <div className="flex flex-1 items-center justify-start gap-2">
      <div className="flex flex-1 items-center justify-center gap-2 px-2.5 py-1">
        <CetakKta customColor="#17191c" />
        <button
          onClick={onCR80Click}
          className="justify-start text-xs font-normal text-[#17191c]"
        >
          CR80
        </button>
      </div>
      {/* Divider vertikal */}
      <div className="mx-1 h-6 w-px bg-[#ff0000]" />
      <div className="flex flex-1 items-center justify-center gap-2 px-2.5 py-1">
        <CetakKta customColor="#17a3b8" />
        <button
          onClick={onCR79Click}
          className="justify-start text-xs font-normal text-[#17a3b8]"
        >
          CR79
        </button>
      </div>
    </div>
  );
};

interface PhotoCellProps {
  src?: string;
  alt?: string;
}

export const PhotoCell: React.FC<PhotoCellProps> = ({ src, alt = "Foto" }) => {
  if (src) {
    // Gambar berada di atas styled div (z-index lebih tinggi)
    return (
      <div className="relative">
        <div className="h-6 w-6 rounded border border-[#17a3b8] bg-white" />
        <img
          className="absolute left-[2px] top-[2px] z-10 h-[20px] w-[20px] rounded-[2px]"
          src={src}
          alt={alt}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 rounded border border-[#17a3b8] bg-[#d3d3d3]" />
      <div className="relative h-3.5 w-3.5">
        <div className="absolute left-[4.08px] top-[1.17px] h-[5.83px] w-[5.83px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="absolute left-[1.99px] top-[8.75px] h-[4.08px] w-2.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="absolute left-0 top-0 h-3.5 w-3.5 opacity-0" />
      </div>
    </div>
  );
};

export const QRCodeCell: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-6 w-6 overflow-hidden rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8]">
        <div className="absolute left-[3px] top-[3px] h-[18px] w-[18px] bg-[#17191c]" />
      </div>
    </div>
  );
};

interface StatusCellProps {
  status: "active" | "inactive";
}

export const StatusCell: React.FC<StatusCellProps> = ({ status }) => {
  const isActive = status === "active";

  return (
    <div className="flex items-center justify-center">
      <div className={`flex h-[18px] w-[18px] items-center justify-center rounded-full ${
        isActive ? "bg-[#17a3b8]" : "bg-[#ff0000]"
      }`}>
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
