"use client"
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import Image from 'next/image';

interface BannerSliderProps {
  banners: { src: string; alt: string }[];
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </div>
);

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center items-center mt-4">
        <ul className="flex space-x-6">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`relative flex items-center justify-center w-[50px] h-[10px] transition-all duration-500`}
      >
        <div
          className={`absolute h-[10px] rounded-full transition-all duration-500 ${
            i === activeSlide ? 'w-[50px] bg-blue-500' : 'w-[10px] bg-gray-300'
          }`}
        />
      </div>
    ),
  };

  return (
    <div className="relative w-full mx-auto">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-auto">
            <Image
              src={banner.src}
              alt={banner.alt}
              layout="responsive"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
