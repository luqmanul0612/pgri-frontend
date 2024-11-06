import React from "react";
import CardSVG from "../../../../public/icon/card";
import CardBlackSVG from "../../../../public/icon/cardBlack";
import HeaderPermohonan from "./HeaderPermohonan";
import TabelPermohonan from "./TabelPermohonan";

const Permohonan = () => {
  return (
    <div>
      <HeaderPermohonan />
      <div className="mt-4">
        <TabelPermohonan/>
      </div>
    </div>
  );
};

export default Permohonan;
