import { useState } from "react";

interface ReusableInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const Provinsi = () => {
  const [kodeProvinsi, setKodeProvinsi] = useState("");
  const [namaProvinsi, setNamaProvinsi] = useState("");

  const handleSimpanData = () => {
    console.log({ kodeProvinsi, namaProvinsi });
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
              fill="#17191C"
            />
          </svg>
          <div className="flex-1 text-base font-semibold text-[#17191c]">
            Tambah Wilayah Provinsi
          </div>
        </div>
        <div className="flex items-end gap-4 rounded-2xl bg-white p-4 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
          <ReusableInput
            label="Kode Provinsi"
            placeholder="Masukan Kode Provinsi (Contoh: 11)"
            value={kodeProvinsi}
            onChange={setKodeProvinsi}
            required
          />
          <ReusableInput
            label="Nama Provinsi"
            placeholder="Tuliskan Nama Provinsi (Contoh: Aceh)"
            value={namaProvinsi}
            onChange={setNamaProvinsi}
            required
          />
          <button
            onClick={handleSimpanData}
            className="flex w-[180px] items-center justify-center gap-2.5 rounded-[10px] bg-[#17a3b8] px-2.5 py-3 transition-colors hover:bg-[#138a9e]"
          >
            <div className="text-sm font-normal text-[#f5f7fb]">
              Simpan Data
            </div>
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex flex-1 items-center gap-2.5">
          <div className="flex-1 text-base font-semibold text-[#17191c]">
            Data Tabel Wilayah Provinsi
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-[10px] p-3 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]">
          <div className="text-xs font-normal text-[#17a3b8]">Filter</div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 10.5V15L7.5 16.5V10.5L3 3.75V2.25H15V3.75L10.5 10.5ZM4.80277 3.75L9 10.0458L13.1972 3.75H4.80277Z"
              fill="#17A3B8"
            />
          </svg>
        </div>
        <div className="flex w-[300px] items-center gap-2 rounded-[10px] p-3 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]">
          <div className="flex-1 text-xs font-normal text-[#a7a7a7]">
            Ketik Nama, NPA
          </div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5232 12.4626L16.7353 15.6746L15.6746 16.7353L12.4626 13.5232C11.3077 14.4472 9.843 15 8.25 15C4.524 15 1.5 11.976 1.5 8.25C1.5 4.524 4.524 1.5 8.25 1.5C11.976 1.5 15 4.524 15 8.25C15 9.843 14.4472 11.3077 13.5232 12.4626ZM12.0185 11.9061C12.9356 10.9609 13.5 9.6717 13.5 8.25C13.5 5.34937 11.1506 3 8.25 3C5.34937 3 3 5.34937 3 8.25C3 11.1506 5.34937 13.5 8.25 13.5C9.6717 13.5 10.9609 12.9356 11.9061 12.0185L12.0185 11.9061Z"
              fill="#A7A7A7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ReusableInput = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: ReusableInputProps) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex gap-1">
        <div className="text-xs font-normal text-[#17191c]">{label}</div>
        {required && (
          <div className="text-xs font-normal text-[#ff0000]">*</div>
        )}
      </div>
      <div className="flex h-11 items-center gap-2.5 rounded-lg pl-4 pr-3 outline outline-1 outline-offset-[-1px] outline-[#d3d3d3]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm font-normal text-[#17191c] outline-none placeholder:text-[#919191]"
        />
      </div>
    </div>
  );
};
