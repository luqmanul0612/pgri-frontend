import { FC } from "react";

interface pageProps {
  params: Promise<any>;
  searchParams?: Promise<any>;
}

const page: FC<pageProps> = async () => {
  return (
    <div className="inline-flex w-full flex-col items-center justify-center gap-9 px-4">
      {
        // ANCHOR: svg
        // #region svg
      }
      <div className="relative h-[150px] w-[150px] overflow-hidden">
        <div data-svg-wrapper className="absolute left-[4.76px] top-[19.70px]">
          <svg
            width="142"
            height="111"
            viewBox="0 0 142 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.3164 11.436C13.3424 18.078 3.02236 34.824 1.05136 55.041C-0.607638 72.078 4.26736 96.939 28.5554 102.207C75.8174 112.461 125.437 118.599 136.618 90.411C147.802 62.223 138.076 4.62901 114.103 1.59901C95.0414 -0.809986 54.6074 -1.53599 27.3164 11.436Z"
              fill="#E6E6E6"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[30.28px] top-[16.89px]">
          <svg
            width="90"
            height="40"
            viewBox="0 0 90 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M89.8282 0.389984H0.28125V39.657H89.8282V0.389984Z"
              fill="#68E1FD"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[24.13px] top-[56.16px]">
          <svg
            width="102"
            height="12"
            viewBox="0 0 102 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.28177 0.656982L0.134766 11.742H101.865L95.8258 0.656982H6.28177Z"
              fill="#68E1FD"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[24.13px] top-[56.16px]">
          <svg
            width="102"
            height="12"
            viewBox="0 0 102 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.28177 0.656982L0.134766 11.742H101.865L95.8258 0.656982H6.28177Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[24.15px] top-[67.24px]">
          <svg
            width="102"
            height="6"
            viewBox="0 0 102 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M101.865 0.742004H0.150391V5.25701H101.865V0.742004Z"
              fill="#68E1FD"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[24.15px] top-[71.76px]">
          <svg
            width="102"
            height="30"
            viewBox="0 0 102 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.150391 0.256958L8.34939 29.63H93.1174L101.865 0.256958H0.150391Z"
              fill="#24285B"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[59.95px] top-[21.47px]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9993 31.076C24.3134 31.076 31.0533 24.3361 31.0533 16.022C31.0533 7.70789 24.3134 0.967987 15.9993 0.967987C7.68522 0.967987 0.945312 7.70789 0.945312 16.022C0.945312 24.3361 7.68522 31.076 15.9993 31.076Z"
              fill="#68E1FD"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[59.95px] top-[21.47px]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9993 31.076C24.3134 31.076 31.0533 24.3361 31.0533 16.022C31.0533 7.70789 24.3134 0.967987 15.9993 0.967987C7.68522 0.967987 0.945312 7.70789 0.945312 16.022C0.945312 24.3361 7.68522 31.076 15.9993 31.076Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[63.03px] top-[24.55px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9993 23.992C18.6101 23.992 23.9693 18.6328 23.9693 12.022C23.9693 5.41112 18.6101 0.0519714 11.9993 0.0519714C5.38845 0.0519714 0.0292969 5.41112 0.0292969 12.022C0.0292969 18.6328 5.38845 23.992 11.9993 23.992Z"
              fill="#24285B"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[70.69px] top-[28.33px]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.98254 13.423C10.4603 13.423 13.2796 10.6037 13.2796 7.12598C13.2796 3.64824 10.4603 0.828979 6.98254 0.828979C3.50481 0.828979 0.685547 3.64824 0.685547 7.12598C0.685547 10.6037 3.50481 13.423 6.98254 13.423Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[76.98px] top-[30.91px]">
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.45143 5.35298C4.81502 5.35298 5.92043 4.24757 5.92043 2.88398C5.92043 1.52039 4.81502 0.414978 3.45143 0.414978C2.08783 0.414978 0.982422 1.52039 0.982422 2.88398C0.982422 4.24757 2.08783 5.35298 3.45143 5.35298Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[97.24px] top-[23.03px]">
          <svg
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.84628 0.530975H22.8283V15.93H4.84628C2.30228 15.93 0.238281 13.866 0.238281 11.322V5.13898C0.238281 2.59498 2.30228 0.530975 4.84628 0.530975Z"
              fill="#000001"
            />
          </svg>
        </div>
        <div
          data-svg-wrapper
          className="absolute left-[104.94px] top-[43.63px]"
        >
          <svg
            width="12"
            height="5"
            viewBox="0 0 12 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0225 0.131989H0.939453V4.99199H11.0225V0.131989Z"
              fill="#24285B"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[37.43px] top-[26.95px]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6706 0.448975H0.433594V12.686H12.6706V0.448975Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[37.43px] top-[47.64px]">
          <svg
            width="13"
            height="5"
            viewBox="0 0 13 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6706 0.139984H0.433594V4.07598H12.6706V0.139984Z"
              fill="#24285B"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[48.85px] top-[12.40px]">
          <svg
            width="50"
            height="6"
            viewBox="0 0 50 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M49.2387 0.898987H0.845703V5.38999H49.2387V0.898987Z"
              fill="#24285B"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[37.43px] top-[80.22px]">
          <svg
            width="75"
            height="59"
            viewBox="0 0 75 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.9026 0.722961H0.433594V58.098H74.9026V0.722961Z"
              fill="#FFD200"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[46.10px] top-[80.22px]">
          <svg
            width="58"
            height="50"
            viewBox="0 0 58 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.2427 0.722961H0.0957031V49.482H57.2427V0.722961Z"
              fill="white"
            />
          </svg>
        </div>
        <div data-svg-wrapper className="absolute left-[37.43px] top-[80.22px]">
          <svg
            width="75"
            height="7"
            viewBox="0 0 75 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M74.9026 0.722961H0.433594V6.94196H74.9026V0.722961Z"
              fill="#000001"
            />
          </svg>
        </div>
      </div>
      {
        // #endregion
      }

      <div className="flex w-full flex-col items-center gap-4 text-center text-[#17191c]">
        <div className="text-2xl font-bold">Cetak KTA PGRI</div>
        <div className="max-w-xl text-lg font-normal">
          Admin dapat melakukan cetak KTA PGRI untuk seluruh Anggota yang telah
          terverifikasi dan aktif sesuai dengan kebutuhan!
        </div>
      </div>

      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-2xl p-6 outline outline-1 outline-offset-[-1px] outline-primary">
        <div className="text-center text-sm font-normal text-primary">
          Pilih Jenis Cetak:
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {["Printer DTC", "Printer DTC Non-Blangko", "Printer Non-DTC"].map(
            (label) => (
              <div
                key={label}
                className="flex w-[180px] items-center justify-center rounded-[10px] bg-primary px-2.5 py-3"
              >
                <button className="text-sm font-normal text-[#f5f7fb]">
                  {label}
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
