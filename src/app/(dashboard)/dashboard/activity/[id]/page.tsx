"use client";

import Image from "next/image";
import { FC } from "react";
import example1 from "../../assets/dummy/example-1.png";
import ArrowLineLeft from "../../assets/arrow-line-left.svg";
import DOMPurify from "dompurify";
import Button from "@/components/customs/button";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const activity = {
  id: "1",
  title: "WEBINAR SERIES 2 - HARDIKNAS 2025",
  content:
    "Dalam rangka memperingati Hari Pendidikan Nasional 2025, PGRI Muaro Jambi bekerja sama dengan PSLLC Pusat dan Maxy Academy menyelenggarakan Webinar Series 2 dengan tema:",
  image: example1,
};

const content = `<h2 style="font-size: 14px; font-weight: 700">WEBINAR SERIES 2 - HARDIKNAS 2025</h2><p style="font-size: 12px; font-weight: 400">Deep Learning, Koding dan Kecerdasan Artifisial untuk Pembelajaran</p><p style="font-size: 12px; font-weight: 400">Dalam rangka memperingati Hari Pendidikan Nasional 2025, PGRI Muaro Jambi bekerja sama dengan PSLLC Pusat dan Maxy Academy menyelenggarakan Webinar Series 2 dengan tema:<br>"Deep Learning, Koding dan Kecerdasan Artifisial untuk Pembelajaran"</p><p style="font-size: 12px; font-weight: 400">Pembicara dan Narasumber:</p><ul style="font-size: 12px; font-weight: 400; list-style-type: disc;"><li style="margin-left:20px;">Bambang Bayu Suseno, S.P., M.M., M.Si. (Bupati Muaro Jambi)</li><li style="margin-left:20px;">Firdaus, S.Ag., M.M. (Kadis Dikbud Muaro Jambi)</li><li style="margin-left:20px;">Ismiyanto, M.Pd. (Ketua PGRI Muaro Jambi)</li><li style="margin-left:20px;">Wijaya, S.Pd., M.Pd. (Keynote Speaker) <br> (Wasekjen PB PGRI / Founder KGDI)</li><li style="margin-left:20px;">Prof. Dr. Ir. Richardus Eko Indrajit, M.Sc., M.B.A., M.Phil., M.A. (Narasumber) <br> (Ketua PB PGRI / Ketua PSLLC Pusat)</li></ul><p style="font-size: 12px; font-weight: 400;">Fasilitas: Sertifikat dan Materi</p><p style="font-size: 12px; font-weight: 400;">Hadiah menarik (Hadiah Lawang)</p><p style="font-size: 12px; font-weight: 400;">Kontak Informasi:</p><ul style="list-style-type: disc; font-size: 12px; font-weight: 400;"><li style="margin-left:20px;">Bpk. Ramang S | 0853-6697-2100</li><li style="margin-left:20px;">Bpk. Rizki M.S | 0852-6626-4761</li><li style="margin-left:20px;">Ibu Rika A. | 0852-6612-8584</li></ul><p style="font-size: 12px; font-weight: 400;">Diselenggarakan oleh:<br>PGRI Muaro Jambi, PSLLC, dan Maxy Academy</p><p style="font-size: 12px; font-weight: 400;">Temukan kami di: Instagram @PGRI Muaro Jambi</p>`;

const ActivityDetail: FC<Props> = ({ params: { id } }) => {
  const router = useRouter();
  const cleanHtml = DOMPurify.sanitize(content);
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <button onClick={() => router.back()}>
          <ArrowLineLeft />
        </button>
        <p className="text-base font-semibold text-black">Kegiatan PGRI</p>
      </div>
      <p className="mt-4 text-base font-bold text-black">
        WEBINAR SERIES 2 - HARDIKNAS 2025
      </p>
      <p className="text-xs font-normal text-black">
        Deep Learning, Koding dan Kecerdasan Artifisial untuk Pembelajaran.
      </p>
      <div className="mt-4 flex gap-5">
        <div className="bg-primary-500 h-fit rounded-[14px] p-[25px]">
          <div className="relative aspect-[4/5] h-[500px] w-[400px] rounded-[8px] p-[10px]">
            <Image
              alt="image"
              src={activity.image}
              fill
              className="rounded-[8px] object-cover"
            />
          </div>
        </div>
        <div className="border-primary-500 rounded-[14px] border p-[25px]">
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          <div className="border-primary-300 mt-4 flex flex-col gap-4 rounded-[8px] border p-4">
            <div className="flex justify-between">
              <p className="text-xs font-normal text-black">Tempat Pelatihan</p>
              <p className="text-xs font-normal text-black">
                Gedung Guru Kabupaten Banyumas
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-normal text-black">
                Tanggal Pelatihan
              </p>
              <p className="text-xs font-normal text-black">17-19 Juli 2024</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-normal text-black">Biaya</p>
              <p className="text-xs font-normal text-black">Rp 50.000</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-normal text-black">Sertifikat</p>
              <p className="text-xs font-normal text-black">Ada</p>
            </div>
          </div>
          <Button className="mt-4" fullWidth>
            Daftar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
