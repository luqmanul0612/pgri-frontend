import React from "react";
import IconLindungiGuru from "../../../../../public/assets/icon-lindungi-guru";
import IconHandSVG from "../../../../../public/icon/icon-hand";

const HeaderIuranTagihan: React.FC<any> = (props: any) => {
  return (
    <>
      <div className='p-4 flex flex-col rounded-2xl border border-custom-aqua bg-white gap-3'>
        <div className=''>
          <div className='text-primary text-[16px] font-semibold'>Total Iuran Anggota PGRI</div>
          <div className='text-[42px] text-primary font-bold'>Rp80.000.000</div>
        </div>

        <div className={"grid grid-cols-6 gap-4"}>
          <div className={"border border-custom-aqua bg-white gap-3 rounded-2xl py-6 px-6 flex flex-col"}>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-primary">Rp80.000.000</div>
              <div>
                <IconHandSVG />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-[16px] text-left text-primary">Total Iuran Pusat</div>
              <div className="text-xs text-left text-primary">10%</div>
            </div>
          </div>

          <div className={"border border-custom-aqua bg-white gap-3 rounded-2xl py-6 px-6 flex flex-col"}>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-primary">Rp80.000.000</div>
              <div>
                <IconHandSVG />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-[16px] text-left text-primary">Total Iuran Pusat</div>
              <div className="text-xs text-left text-primary">10%</div>
            </div>
          </div>

          <div className={"border border-custom-aqua bg-white gap-3 rounded-2xl py-6 px-6 flex flex-col"}>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-primary">Rp80.000.000</div>
              <div>
                <IconHandSVG />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-[16px] text-left text-primary">Total Iuran Pusat</div>
              <div className="text-xs text-left text-primary">10%</div>
            </div>
          </div>

          <div className={"border border-custom-aqua bg-white gap-3 rounded-2xl py-6 px-6 flex flex-col"}>
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-primary">Rp80.000.000</div>
              <div>
                <IconHandSVG />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-[16px] text-left text-primary">Total Iuran Pusat</div>
              <div className="text-xs text-left text-primary">10%</div>
            </div>
          </div>
        </div>

        {/*<button>*/}
        {/*  <div className="flex justify-between">*/}
        {/*    <div className="text-lg font-semibold">2</div>*/}
        {/*    <div>*/}
        {/*      <IconLindungiGuru color={'#F5F7FB'} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-col">*/}
        {/*    <div className="font-semibold text-[16px] text-left">Laporan Selesai</div>*/}
        {/*    <div className="text-xs text-left">Perlindungan untuk Guru</div>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
    </>
  )
}

export default HeaderIuranTagihan;
