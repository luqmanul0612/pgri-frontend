import Image from "next/image";

const UnderDevelopment = () => {
  return (
    <div className="flex h-[calc(100vh_-_150px)] flex-col items-center justify-center">
      <Image
        src="/assets/under-development.webp"
        alt="Under Development"
        width={150}
        height={150}
      />
      <h1 className="mt-9 text-[24px] font-bold text-black">
        Dalam Tahap Pengembangan!
      </h1>
      <p className="text-[14px] text-black font-normal mt-4">
        “PGRI dan Tim sedang melakukan pengembangan di menu Pelatihan Anggota”
      </p>
    </div>
  );
};

export default UnderDevelopment;
