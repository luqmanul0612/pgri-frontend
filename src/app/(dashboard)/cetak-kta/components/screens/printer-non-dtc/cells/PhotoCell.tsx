import React from "react";

interface PhotoCellProps {
  src?: string;
  alt?: string;
}

export const PhotoCell: React.FC<PhotoCellProps> = ({ src, alt = "Foto" }) => {
  if (src) {
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
    <div className="relative">
      <div className="h-6 w-6 rounded border border-[#17a3b8] bg-white" />
      <div className="absolute left-[2px] top-[2px] z-10 h-[20px] w-[20px] rounded-[2px]" />
    </div>
  );
};