import { FC } from "react";

const PertumbuhanCard: FC = () => {
  return (
    <div className="flex h-[226px] flex-col items-center rounded-2xl bg-white">
      {/* Header with Icon and Title */}
      <div className="flex w-full flex-col items-center gap-2 rounded-tl-2xl rounded-tr-2xl bg-[#17a2b8] px-2.5 pt-5">
        {/* Icon placeholder (you can replace with actual icon) */}
        <div className="h-11 w-11 rounded-full bg-white"></div>
        {/* Title */}
        <div className="text-center text-sm font-semibold text-white">
          Total Pendaftar
        </div>
      </div>

      {/* Content with Stats */}
      <div className="flex w-full flex-col items-center gap-2 rounded-bl-2xl rounded-br-2xl border-b border-l border-r border-[#17a3b8]/20 px-4 py-2">
        {/* Total Number */}
        <div className="text-lg font-bold text-[#17a2b8]">334.850</div>

        {/* Percentage change */}
        <div className="text-center text-xs text-[#0ec516]">
          +12% selama 28 hari
        </div>
      </div>
    </div>
  );
};

export default PertumbuhanCard;
