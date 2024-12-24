"use client";

import React, { useState } from "react";
import IconLindungiGuru from "../../../../../public/assets/icon-lindungi-guru";
import IconAspirasiGuru from "../../../../../public/assets/icon-aspirasi-guru";

const HeaderAspirasiGuru: React.FC<any> = (props) => {
  const [activeButton, setActiveButton] = useState<string>('laporan-perlindungan');

  const handleButtonClick = (value: string) => {
    console.log(value);
    setActiveButton(value);
  }
  return (
    <>
      <div className='p-4 flex items-center rounded-xl border border-custom-aqua bg-white gap-3'>
        <div className='flex-1'>
          <div className='text-primary text-[16px] font-semibold'>Total Aspirasi Guru</div>
          <div className='text-[42px] text-primary font-bold'>8</div>
        </div>

        <button
          onClick={() => handleButtonClick('laporan-perlindungan')}
          className={`laporan-perlindungan ${
            activeButton === 'laporan-perlindungan' ? 'bg-primary text-white' : 'bg-white text-[#17191C]'
          } rounded-xl w-[200px] p-4 border transition-all ${
            activeButton === 'laporan-perlindungan' ? '' : 'border-custom-aqua'
          }`}
        >
          <div className="flex justify-between">
            <div className="text-lg font-semibold">2</div>
            <div>
              {activeButton === 'laporan-perlindungan' && (
                // <IconLindungiGuru color={'#F5F7FB'} />
                <IconAspirasiGuru color={'#F5F7FB'} />
              )}

              {
                activeButton !== 'laporan-perlindungan' && (
                  // <IconLindungiGuru color={'#17191C'} />
                  <IconAspirasiGuru color={'#17191C'} />
                )
              }
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-bold text-[16px] text-left">Laporan Aspirasi Guru</div>
            <div className="text-xs text-left">Aspirasi para Guru</div>
          </div>
        </button>

        <button
          onClick={() => handleButtonClick('laporan-selesai')}
          className={`laporan-selesai ${
            activeButton === 'laporan-selesai' ? 'bg-primary text-white' : 'bg-white text-[#17191C]'
          } rounded-xl w-[200px] p-4 border ${
            activeButton === 'laporan-selesai' ? '' : 'border-custom-aqua'
          }`}
        >
          <div className="flex justify-between">
            <div className="text-lg font-semibold">2</div>
            <div>
              {activeButton === 'laporan-selesai' && (
                <IconLindungiGuru color={'#F5F7FB'} />
              )}

              {
                activeButton !== 'laporan-selesai' && (
                  <IconLindungiGuru color={'#17191C'} />
                )
              }
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-[16px] text-left">Aspirasi Selesai</div>
            <div className="text-xs text-left">Aspirasi para Guru</div>
          </div>
        </button>
      </div>
    </>
  )
}

export default HeaderAspirasiGuru;
