import React from "react";
import IconRowRight from "../../../../../public/icon/row-right";
import IconProfileAdmin from "../../../../../public/icon/icon-profile-admin";

interface IDataItem {
  name: string,
  email: string,
  totalProvinces?: string;
  total?: string,
}

interface ICardRole {
  itemData?: IDataItem;
  isIcon?: boolean;
}

const CardRole: React.FC<ICardRole> = ({ itemData, isIcon = false }: ICardRole) => {
  return (
    <div className={'flex flex-row items-center justify-between border border-custom-aqua rounded-xl py-3 pl-3 pr-4 cursor-pointer'}>
      <div className={'flex flex-row items-center gap-2.5'}>
        <div className={'p-1.5 bg-[#D9D9D9] border border-primary rounded'}>
          <IconProfileAdmin />
        </div>
        <div className={'flex flex-col'}>
          <h4 className={'text-sm font-medium'}>{ itemData?.name }</h4>
          { isIcon && (<p className={"text-xs"}>{ itemData?.email }</p>)}
          { !isIcon && (<p className={"text-xs"}>{ itemData?.totalProvinces } Provinsi</p>) }
        </div>
      </div>
      {isIcon && (
        <IconRowRight />
      )}
      { !isIcon && (
        <h2 className={'text-base text-primary font-medium'}>{ itemData?.total } Admin</h2>
      ) }
    </div>
  )
}

export default CardRole;
