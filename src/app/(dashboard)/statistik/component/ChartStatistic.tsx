"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';

// Import HighchartsReact secara dinamis dan menonaktifkan SSR
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false
});

interface ChartProps {
  categoryChart: string
}

const ChartStatistic: React.FC<ChartProps> = ({ categoryChart}) => {
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
        data: [17400, 14400, 13000, 8000, 5000], // Data untuk seri 'Corn'
      },
      {
        type: 'column', // Menambahkan tipe grafik untuk seri kedua
        name: 'Perempuan', // Nama seri kedua
        data: [16400, 13400, 11000, 14000, 4000], // Data untuk seri 'Wheat'
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
        data: [
          { y: 200, color: '#2CAFFE' }, // Warna merah
          { y: 500, color: '#544FC5' }, // Warna hijau
          { y: 1000, color: '#20C997' }, // Warna biru
          { y: 400, color: '#FD7E14' }, // Warna kuning
          { y: 700, color: '#007BFF' }, // Warna ungu
        ],
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: ' units',
    },
  };

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
      categories: ['Sudah Bersertifikat', 'Belum Bersertifikat'], // Kategori pada sumbu X
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
        ],
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
            <HighchartsReact highcharts={Highcharts} options={teachingPlace} />
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
