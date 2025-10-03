import ArrowTopRight from "@/app/(dashboard)/dashboard/assets/arrow-top-right.svg";
import { FC } from "react";

export type CardDashboardFinanceProps = {
  label: string;
  value: string;
  description: string;
  percentage: number;
};

const CardDashboardFinance: FC<CardDashboardFinanceProps> = (props) => {
  const { label, value, description, percentage } = props;
  return (
    <div className="w-full border-[1px] border-l-0 border-primary-500 last:border-r-0">
      <div className="flex items-center justify-between px-[20px] py-[10px]">
        <div className="flex flex-col">
          <p className="text-[12px] font-normal text-black">{label}</p>
          <p className="mt-1 text-[18px] font-bold text-black">{value}</p>
          <p className="mt-1 text-[12px] font-normal text-black">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-[24px] bg-primary-50 px-3 py-1">
          <p className="text-[17px] font-bold text-primary-500">
            {percentage * 100}%
          </p>
          <ArrowTopRight />
        </div>
      </div>
    </div>
  );
};

export default CardDashboardFinance;
