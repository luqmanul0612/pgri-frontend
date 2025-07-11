"use client";

import { FC } from "react";
import { WilayahData } from "./types";
import Edit from "../icons/edit";
import Delete from "../icons/delete";

interface ActionCellProps {
  data: WilayahData;
}

export const ActionCell: FC<ActionCellProps> = ({ data }) => {
  const handleEdit = () => {
    console.log("Edit:", data);
  };

  const handleDelete = () => {
    console.log("Delete:", data);
  };

  return (
    <div className="flex items-center justify-between gap-3 px-8">
      <button
        onClick={handleEdit}
        className="flex items-center gap-1 text-[#17a3b8] hover:opacity-80"
      >
        <Edit />
        <span className="text-sm">Edit</span>
      </button>
      <div className="h-5 w-[1.3px] bg-[#17191c]" />
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 text-[#ff0000] hover:opacity-80"
      >
        <Delete />
        <span className="text-sm">Hapus</span>
      </button>
    </div>
  );
};
