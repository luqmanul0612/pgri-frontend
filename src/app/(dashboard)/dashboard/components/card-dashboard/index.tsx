import React from "react";
import DesignPencil from "./icon/design-pencil.svg";
import DirectboxNotif from "./icon/directbox-notif.svg";
import People from "./icon/people.svg";
import SecurityUser from "./icon/security-user.svg";

interface Props {
  value: number;
  idx: 0 | 1 | 2 | 3;
}

const data = [
  { label: "Data Anggota", icon: People, color: "#007BFF" },
  { label: "Karya Guru", icon: DesignPencil, color: "#FFC107" },
  { label: "Aspirasi Guru", icon: DirectboxNotif, color: "#001F3F" },
  { label: "Lindungi Guru", icon: SecurityUser, color: "#DC3545" },
];

const CardDashboard: React.FC<Props> = ({ value, idx }) => {
  const Icon = data[idx].icon;
  const color = data[idx].color;
  const label = data[idx].label;
  return (
    <div
      className="flex w-full items-center rounded-2xl bg-[currentColor] p-5 shadow-custom-shadow"
      style={{ color }}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-white">
          <Icon />
        </div>
      </div>
      <div className="ml-5">
        <span className="text-[16px] font-normal text-white">{label}</span>
        <div className="text-xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
};

export default CardDashboard;
