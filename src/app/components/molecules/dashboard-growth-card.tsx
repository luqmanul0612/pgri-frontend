import clsx from "clsx";
import { FC } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import UserGroup from "@/assets/icons/db-user-group.svg";

interface Props {
  data: { value: number }[];
  title: string;
}

const DashboardGrowthCard: FC<Props> = (props) => {
  const { data, title } = props;
  const isGoingUp = data[data.length - 1].value >= data[0].value;
  const strokeColor = isGoingUp ? "#00C853" : "#DC2626";
  const textColor = isGoingUp ? "text-[#00C853]" : "text-[#DC2626]";
  const glowColor = isGoingUp
    ? "[filter:drop-shadow(0_5px_6px_rgba(0,200,83,0.8))]"
    : "[filter:drop-shadow(0_5px_6px_rgba(220,38,38,0.8))]";

  return (
    <div className="w-full rounded-[16px] border border-[rgba(23,163,184,0.20)] bg-white">
      <div className="flex flex-col items-center justify-center rounded-t-xl bg-primary py-5">
        <UserGroup />
        <h2 className="text-white">{title}</h2>
      </div>
      <div className="flex flex-col items-center py-4">
        <p className="text-center text-lg font-bold text-[#17a2b8]">334.850</p>
        <div className="h-[60px] w-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={3}
                dot={false}
                className={glowColor}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={clsx("text-center text-xs text-[#0ec516]", textColor)}>
          +12% selama 28 hari
        </div>
      </div>
    </div>
  );
};

export default DashboardGrowthCard;
