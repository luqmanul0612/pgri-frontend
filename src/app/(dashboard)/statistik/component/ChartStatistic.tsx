"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';

// Import HighchartsReact secara dinamis dan menonaktifkan SSR
const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false
});

const ChartStatistic: React.FC = () => {
  const options: Highcharts.Options = {
    title: {
      text: 'My Chart Example',
    },
    chart: {
      type: 'column',
    },
    xAxis: {
      categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'], // Kategori pada sumbu X
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
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        type: 'column', // Menambahkan tipe grafik untuk seri pertama
        name: 'Corn', // Nama seri pertama
        data: [387749, 280000, 129000, 64300, 54000, 34300], // Data untuk seri 'Corn'
      },
      {
        type: 'column', // Menambahkan tipe grafik untuk seri kedua
        name: 'Wheat', // Nama seri kedua
        data: [45321, 140000, 10000, 140500, 19500, 113500], // Data untuk seri 'Wheat'
      },
    ],
    tooltip: {
      shared: true,
      valueSuffix: ' units',
    },
  };

  return (
    <div>
      <h1>Highcharts Example</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartStatistic;
