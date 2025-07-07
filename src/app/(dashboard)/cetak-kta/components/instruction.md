# penyesuain header table non dtc (C:\Users\almin\Desktop\pgri-frontend\src\app\(dashboard)\cetak-kta\components\printer-non-dtc.tsx)

berikut adalah kriteria penyesuaian:

- style dan footer tidak perlu dirubah
- header ada sedikit penyesuaian
- gunakan component table yang sama dengan component printer yang lain, tetapi buat component reusable dan dapat digunakan dengan header yang berbeda.
- berikut adalah code dari figma (unoptimized) sebagai gambaran dari table tersebut:
<div className="self-stretch inline-flex justify-start items-start">
  <div className="inline-flex flex-col justify-start items-start">
    <div className="w-[50px] px-3 py-4 bg-[#17a3b8] inline-flex justify-start items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">NO.</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">1</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">2</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">3</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">4</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">5</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">6</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">7</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">8</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">9</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#17191c] text-xs font-normal font-['Poppins']">10</div>
    </div>
  </div>
  <div className="w-[50px] inline-flex flex-col justify-start items-center">
    <div className="self-stretch h-12 px-2.5 py-4 bg-[#17a3b8] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#f5f7fb]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-[#db3d35]" />
        <div className="w-[8.50px] h-[5.66px] left-[7.75px] top-[9.17px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative">
        <div className="w-5 h-5 left-[2px] top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#17191c]" />
        <div className="w-6 h-6 left-0 top-0 absolute opacity-0 border-[1.50px] border-[#17191c]" />
      </div>
    </div>
  </div>
  <div className="w-[120px] inline-flex flex-col justify-start items-start">
    <div className="self-stretch p-4 bg-[#17a3b8] inline-flex justify-start items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">NPA</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">47575893</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">348583949</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">453667389</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">33201615519</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">2382373748</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">23723273746</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">272363636</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">323849473</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">2038364678</div>
    </div>
    <div className="self-stretch h-[58px] px-4 py-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">2373448492</div>
    </div>
  </div>
  <div className="w-40 inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-start items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">NIK</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">239303746473889</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">237373546238373</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">993746362638373</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">9937362356429377</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">9936276263253738</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">2383749429388499</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">4358453934848449</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">4384922388384758</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">2389447584928394</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">5868583483939384</div>
    </div>
  </div>
  <div className="flex-1 inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-start items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">Nama Anggota</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Mohammad Alfath, MM, S.Kom</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Richo Bae, MM, S.Kom</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Brahim Diaz, S.Ag</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Dian Indah Paraswati, S.Pd</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Putu Ayu Parwati, S.Pd</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Muhartati, S.Pd</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Anugrahani Istiqamah Aljaatziyah, S.Pd, Gr</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Yunita Dewi Anggraini, S.Pd</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Zulfatun Nikmah, S.Pd</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Oktafinandi Azizurrohmsn, S.Pd</div>
    </div>
  </div>
  <div className="flex-1 inline-flex flex-col justify-start items-start">
    <div className="self-stretch py-4 bg-[#17a3b8] inline-flex justify-start items-center gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">Tempat Lahir</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Banyumas</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Jepara</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Seleman</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Pasuruan</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Senen</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Senen</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Kuta</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Kuta</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Pare-Pare</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">Mataram</div>
    </div>
  </div>
  <div className="w-[150px] inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-start items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">Tanggal Lahir</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">01/01/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">02/02/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">03/03/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">04/04/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">05/05/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">06/06/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">07/07/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">08/08/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">09/09/2000</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-start items-center gap-2.5">
      <div className="flex-1 justify-start text-[#17191c] text-xs font-normal font-['Roboto']">10/10/2000</div>
    </div>
  </div>
  <div className="w-[90px] inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-center items-start gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">Foto</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-[#d3d3d3] rounded border border-[#17a3b8]" />
      <div className="w-3.5 h-3.5 relative">
        <div className="w-[5.83px] h-[5.83px] left-[4.08px] top-[1.17px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="w-2.5 h-[4.08px] left-[1.99px] top-[8.75px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="w-3.5 h-3.5 left-0 top-0 absolute opacity-0" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-[#d3d3d3] rounded border border-[#17a3b8]" />
      <div className="w-3.5 h-3.5 relative">
        <div className="w-[5.83px] h-[5.83px] left-[4.08px] top-[1.17px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="w-2.5 h-[4.08px] left-[1.99px] top-[8.75px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-[#f5f7fb]" />
        <div className="w-3.5 h-3.5 left-0 top-0 absolute opacity-0" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 bg-white rounded border border-[#17a3b8]" />
      <img className="w-[18px] h-[18px] rounded-sm" src="https://placehold.co/18x18" />
    </div>
  </div>
  <div className="w-[100px] inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">QR Code</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2.5">
      <div className="w-6 h-6 relative rounded outline outline-1 outline-offset-[-1px] outline-[#17a3b8] overflow-hidden">
        <div className="w-[18px] h-[18px] left-[3px] top-[3px] absolute bg-[#17191c]" />
      </div>
    </div>
  </div>
  <div className="inline-flex flex-col justify-start items-start">
    <div className="self-stretch px-2.5 py-4 bg-[#17a3b8] inline-flex justify-center items-center gap-2.5">
      <div className="justify-start text-[#f5f7fb] text-sm font-semibold font-['Roboto']">Status</div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#ff0000]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#ff0000]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
    <div className="self-stretch h-[58px] p-2.5 bg-[#f5f7fb] inline-flex justify-center items-center gap-2">
      <div className="w-[18px] h-[18px] relative overflow-hidden">
        <div className="w-[15px] h-[15px] left-[1.50px] top-[1.50px] absolute bg-[#17a3b8]" />
      </div>
    </div>
  </div>
</div>
