import React from "react";

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
        <div className="relative h-[18px] w-[18px]">
          <div className="absolute left-[5.44px] top-[1.50px] h-[3.75px] w-[7.12px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
          <div className="absolute left-[6px] top-[11.25px] h-[5.25px] w-1.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
          <div className="absolute left-[2.25px] top-[5.25px] h-[8.25px] w-[13.50px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
          <div className="absolute left-[5.25px] top-[11.25px] h-0 w-[7.50px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
          <div className="absolute left-[5.25px] top-[8.25px] h-0 w-[2.25px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
          <div className="absolute left-0 top-0 h-[18px] w-[18px] opacity-0" />
        </div>
        <button
          onClick={onCR80Click}
          className="justify-start text-xs font-normal text-[#17191c]"
        >
          CR80
        </button>
      </div>
      <div className="h-0 w-5 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-[#ff0000]" />
      <div className="flex flex-1 items-center justify-center gap-2 px-2.5 py-1">
        <div className="relative h-[18px] w-[18px]">
          <div className="absolute left-[5.44px] top-[1.50px] h-[3.75px] w-[7.12px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17a3b8]" />
          <div className="absolute left-[6px] top-[11.25px] h-[5.25px] w-1.5 outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17a3b8]" />
          <div className="absolute left-[2.25px] top-[5.25px] h-[8.25px] w-[13.50px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17a3b8]" />
          <div className="absolute left-[5.25px] top-[11.25px] h-0 w-[7.50px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17a3b8]" />
          <div className="absolute left-[5.25px] top-[8.25px] h-0 w-[2.25px] outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17a3b8]" />
          <div className="absolute left-0 top-0 h-[18px] w-[18px] opacity-0" />
        </div>
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
    return (
      <div className="flex items-center justify-center">
        <div className="h-6 w-6 rounded border border-[#17a3b8] bg-white" />
        <img className="h-[18px] w-[18px] rounded-sm" src={src} alt={alt} />
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
      <div className="relative h-[18px] w-[18px] overflow-hidden">
        <div
          className={`absolute left-[1.50px] top-[1.50px] h-[15px] w-[15px] ${
            isActive ? "bg-[#17a3b8]" : "bg-[#ff0000]"
          }`}
        />
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
