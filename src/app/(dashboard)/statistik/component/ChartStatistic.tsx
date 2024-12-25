"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';
import {
  getCertificate,
  getStage,
  getStatisticsAge,
  getStatisticsEducation
} from "@/app/(dashboard)/statistik/serverAction/statistics";

// Import HighchartsReact secara dinamis dan menonaktifkan SSR
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false
});

interface ChartProps {
  categoryChart: string
}

const ChartStatistic: React.FC<ChartProps> = ({ categoryChart}) => {
  const [dataAgeMale, setDataAgeMale] = useState<any>();
  const [dataAgeFemale, setDataAgeFemale] = useState<any>();
  const [dataEducation, setDataEducation] = useState<any>();
  const [dataStage, setDataStage] = useState<any>();
  const [labelStage, setLabelStage] = useState<any>();
  const [dataCertificate, setDataCertificate] = useState<any>();
  const [labelCertificate, setLabelCertificate] = useState<any>();
  useEffect(() => {
    (async () => {
      const statisticAge = await getStatisticsAge();
      console.log(statisticAge);

      const tampungLakiLaki = statisticAge.data.filter((data: any) => data?.gender == 'laki-laki').map((item: any) => {
        return item.count;
      });
      setDataAgeMale(tampungLakiLaki);

      const tampungPerempuan = statisticAge.data.filter((data: any) => data?.gender == 'perempuan').map((item: any) => {
        return item.count;
      });
      setDataAgeFemale(tampungPerempuan);

      const tampungLabel = statisticAge.data.filter((data: any, index: number) => statisticAge.data.findIndex((item: any) => item.age_range === data.age_range) === index);
      console.log(tampungLabel);

    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dataEducation = await getStatisticsEducation();
      console.log(dataEducation);

      const colors = ['#2CAFFE', '#544FC5', '#20C997', '#FD7E14', '#007BFF']
      const getDataEducation = dataEducation.data.map((item: any, index: number) => {
        return {
          y: item.count,
          color: colors[index % colors.length]
        }
      });
      setDataEducation(getDataEducation);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const dataStage = await getStage();
      console.log(dataStage);

      const colors = ['#2CAFFE', '#544FC5', '#20C997', '#FD7E14', '#007BFF']
      const getDataStatge = dataStage.data.map((item: any, index: number) => {
        return {
          y: item.count,
          color: colors[index % colors.length]
        }
      })
      console.log(getDataStatge);
      setDataStage(getDataStatge);

      const getLabelStage = dataStage.data.map((item: any) => item.name);
      console.log(getLabelStage);
      setLabelStage(getLabelStage);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const dataCertificate = await getCertificate();
      console.log(dataCertificate);

      const colors= ['#2CAFFE', '#544FC5']
      const getDataCertificate = dataCertificate.data.map((item: any, index: number) => {
        return {
          y: item.count,
          color: colors[index % colors.length],
        }
      });
      setDataCertificate(getDataCertificate);

      const getLabelCertificate: [] = dataCertificate.data.map((item: any) => item.name);
      setLabelCertificate(getLabelCertificate);
    })()
  }, []);

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: ['20 - 30 th', '31 - 40 th', '41 - 50 th', '51 - 60 th', '61 th ke atas'], // Kategori pada sumbu X
      crosshair: true,
      accessibility: {
        description: 'Countries', // Deskripsi untuk aksesibilitas
      },
      gridLineWidth: 0,
    },
    yAxis: {
      min: 0, // Nilai minimal pada sumbu Y
      title: {
        text: '', // Judul sumbu Y
      },
      gridLineWidth: 0,
      labels: {
        enabled: false,
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 100,
        maxPointWidth: 34,
      }
    },
    series: [
      {
        type: 'column', // Menambahkan tipe grafik untuk seri pertama
        name: 'Laki-laki', // Nama seri pertama
        // data: [17400, 14400, 13000, 8000, 5000], // Data untuk seri 'Corn'
        data: dataAgeMale
      },
      {
        type: 'column', // Menambahkan tipe grafik untuk seri kedua
        name: 'Perempuan', // Nama seri kedua
        // data: [16400, 13400, 11000, 14000, 4000], // Data untuk seri 'Wheat'
        data: dataAgeFemale
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      valueSuffix: ' Orang',
    },
  };

  const qualification: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: ['SMA/SMK', 'D3', 'S1', 'S2', 'S3'], // Kategori pada sumbu X
      crosshair: true,
      accessibility: {
        description: 'Countries', // Deskripsi untuk aksesibilitas
      },
      gridLineWidth: 0,
    },
    yAxis: {
      min: 0, // Nilai minimal pada sumbu Y
      title: {
        text: '', // Judul sumbu Y
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 34,
        borderRadius: 100,
      }
    },
    series: [
      {
        type: 'column', // Menambahkan tipe grafik untuk seri pertama
        name: 'Kualifikasi Pendidikan', // Nama seri pertama
        data: dataEducation,
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: ' units',
    },
  };

  const stage: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      // categories: ['PAUD', 'TK', 'SD/MI', 'SMP/MTS', 'SMA/MA', 'SMK', 'PT', 'Lainnya']
      categories: labelStage,
    },
    yAxis: {
      min: 0, // Nilai minimal pada sumbu Y
      title: {
        text: '', // Judul sumbu Y
      },
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 34,
        borderRadius: 100,
      }
    },
    series: [
      {
        type: 'column', // Menambahkan tipe grafik untuk seri pertama
        name: 'Kualifikasi Pendidikan', // Nama seri pertama
        // data: [
        //   { y: 200, color: '#2CAFFE' }, // Warna merah
        //   { y: 500, color: '#544FC5' }, // Warna hijau
        //   { y: 1000, color: '#20C997' }, // Warna biru
        //   { y: 400, color: '#FD7E14' }, // Warna kuning
        //   { y: 700, color: '#007BFF' }, // Warna ungu
        //   { y: 700, color: '#D568FB' },
        //   { y: 700, color: '#2EE0CA' },
        //   { y: 700, color: '#DB2424' },
        // ],
        data: dataStage,
      },
    ],
  }

  const teachingPlace: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: ['Sudah Bersertifikat', 'Belum Bersertifkat'], // Kategori pada sumbu X
      crosshair: true,
      accessibility: {
        description: 'Countries', // Deskripsi untuk aksesibilitas
      },
    },
    yAxis: {
      min: 0, // Nilai minimal pada sumbu Y
      title: {
        text: 'Amount', // Judul sumbu Y
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 34,
        borderRadius: 100,
      }
    },
    series: [
      {
        type: 'column', // Menambahkan tipe grafik untuk seri pertama
        name: 'Kualifikasi Pendidikan', // Nama seri pertama
        data: [
          { y: 200, color: '#2CAFFE' }, // Warna merah
          { y: 500, color: '#544FC5' }, // Warna hijau
          { y: 1000, color: '#20C997' }, // Warna biru
          { y: 400, color: '#FD7E14' }, // Warna kuning
          { y: 700, color: '#007BFF' }, // Warna ungu
          { y: 700, color: '#D568FB' },
          { y: 700, color: '#2EE0CA' },
          { y: 700, color: '#DB2424' },
        ],
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: ' units',
    },
  };

  const teacherCertificate: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: labelCertificate,
      crosshair: true,
      accessibility: {
        description: 'Countries',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        maxPointWidth: 34,
        borderRadius: 100,
      }
    },
    series: [
      {
        type: 'column',
        name: 'Sertifikat Pendidik',
        data: dataCertificate,
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      valueSuffix: ' Orang',
    },
  }

  return (
    <>
      { categoryChart  == 'C01' && (
          <div className={'p-10 bg-white rounded-2xl'}>
            <div className={'flex justify-between mb-[34px]'}>
              <h3>Jenis Kelamin & Umur</h3>
              <select>
                <option>Januari - Desember 2024</option>
              </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        )
      }

      {
        categoryChart  == 'C02' && (
          <div className={'p-10 bg-white rounded-2xl'}>
            <div className={'flex justify-between mb-[34px]'}>
              <h3>Kualifikasi Pendidikan</h3>
              <select>
                <option>Januari - Desember 2024</option>
              </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={qualification} />
          </div>
        )
      }

      {
        categoryChart  == 'C03' && (
          <div className={'p-10 bg-white rounded-2xl'}>
            <div className={'flex justify-between mb-[34px]'}>
              <h3>Tempat Mengajar</h3>
              <select>
                <option>Januari - Desember 2024</option>
              </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={stage} />
          </div>
        )
      }

      {
        categoryChart  == 'C04' && (
          <div className={'p-10 bg-white rounded-2xl'}>
            <div className={'flex justify-between mb-[34px]'}>
              <h3>Tempat Mengajar</h3>
              <select>
                <option>Januari - Desember 2024</option>
              </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={teachingPlace} />
          </div>
        )
      }

      {
        categoryChart  == 'C05' && (
          <div className={'p-10 bg-white rounded-2xl'}>
            <div className={'flex justify-between mb-[34px]'}>
              <h3>Sertifikat Pendidik</h3>
              <select>
                <option>Januari - Desember 2024</option>
              </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={teacherCertificate} />
          </div>
        )
      }
    </>
  )
};

export default ChartStatistic;
