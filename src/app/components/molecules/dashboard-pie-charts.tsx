import { FC } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
  colors: string[];
}
const DashboardPieChart: FC<Props> = (props) => {
  const { data, colors } = props;
  return (
    <div className="min-h-[230px] min-w-[230px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={110}
            cornerRadius={8}
            labelLine={false}
            paddingAngle={5}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      className="text-xs"
    >
      {value}
    </text>
  );
};
