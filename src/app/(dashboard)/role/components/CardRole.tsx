import React from "react";
import IconRowRight from "../../../../../public/icon/row-right";
import IconProfileAdmin from "../../../../../public/icon/icon-profile-admin";
import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";

interface IDataItem {
  name: string;
  email: string;
  totalProvinces?: string;
  total?: string;
}

interface ICardRole {
  itemData?: IDataItem;
  isIcon?: boolean;
}

const CardRole: React.FC<ICardRole> = ({
  itemData,
  isIcon = false,
}: ICardRole) => {
  return (
    <div
      onClick={() =>
        useModalUnderDevelopment.getState().setOpenModalUnderDevelopment(true)
      }
      className={
        "flex cursor-pointer flex-row items-center justify-between rounded-xl border border-custom-aqua py-3 pl-3 pr-4"
      }
    >
      <div className={"flex flex-row items-center gap-2.5"}>
        <div className={"rounded border border-primary bg-[#D9D9D9] p-1.5"}>
          <IconProfileAdmin />
        </div>
        <div className={"flex flex-col"}>
          <h4 className={"text-sm font-medium"}>{itemData?.name}</h4>
          {isIcon && <p className={"text-xs"}>{itemData?.email}</p>}
          {!isIcon && (
            <p className={"text-xs"}>{itemData?.totalProvinces} Provinsi</p>
          )}
        </div>
      </div>
      {isIcon && <IconRowRight />}
      {!isIcon && (
        <h2 className={"text-base font-medium text-primary"}>
          {itemData?.total} Admin
        </h2>
      )}
    </div>
  );
};

export default CardRole;
