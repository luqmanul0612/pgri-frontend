import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardPelatihanProps {}

interface CardPelatihanProps {
  onClick?: () => void;
}

const CardPelatihan: React.FC<CardPelatihanProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <Card className={"hover:bg-white hover:shadow-2xl"}>
        <CardHeader>
          <img
            className={"h-[250px] bg-cover"}
            height={"200"}
            src="/assets/pelatihan.png"
            alt="pelatihan"
          />
        </CardHeader>
        <CardContent>
          <div>
            <div className={"flex justify-between"}>
              <p className={"text-[10px]"}>Tanggal Mulai</p>
              <p className={"text-[10px]"}>Minggu, 17 Agustus 2024</p>
            </div>
            <div className={"flex justify-between"}>
              <p className={"text-left text-[10px]"}>Tempat Pelatihan</p>
              <p className={"text-right text-[10px]"}>
                Gedung Guru Kabupaten Banyumas
              </p>
            </div>
            <div className={"flex justify-between"}>
              <p className={"text-[10px]"}>Biaya</p>
              <p className={"text-[10px]"}>Gratis</p>
            </div>
            <div className={"flex justify-between"}>
              <p className={"text-[10px]"}>Sertifikat</p>
              <p className={"text-[10px]"}>Tidak Ada</p>
            </div>
            <div className={"flex justify-between"}>
              <p className={"text-[10px]"}>Kuota</p>
              <p className={"text-[10px]"}>1/10</p>
            </div>
          </div>
          <div className={"mt-2.5"}>
            <h2 className={"mb-2 text-xs font-semibold"}>
              Metode Pengajaran Dengan AI Untuk Guru
            </h2>
            <div>
              <p className={"line-clamp-2 text-[10px]"}>
                Pelatihan ini dirancang untuk guru dan pendidik yang ingin
                memahami dan mengimplementasikan teknologi kecerdasan buatan
                (AI) dalam metode pengajaran mereka. Dengan memanfaatkan AI,
                guru dapat meningkatkan kualitas pembelajaran, menyesuaikan
                materi dengan kebutuhan individu siswa, serta meningkatkan
                efisiensi dalam pengelolaan kelas dan penilaian.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardPelatihan;
