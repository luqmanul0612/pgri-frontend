"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";

interface LeftSectionProps {}

export const LeftSection: FC<LeftSectionProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    "/login-carousel/Image 1.png",
    "/login-carousel/Image 2.png",
    "/login-carousel/Image 3.png",
  ];

  const carouselContent = [
    {
      title: "Verifikasi",
      description:
        "Untuk Verifikasi Keanggotaan dan Pencetakan KTA Harap Menghubungi Admin/Petugas PGRI Tempat Bertugas (Kabupaten/Kota/Cabang)",
    },
    {
      title: "Keanggotaan",
      description:
        "Bergabunglah dengan PGRI dan nikmati berbagai fasilitas serta program yang kami sediakan untuk guru se-Indonesia.",
    },
    {
      title: "Pengembangan",
      description:
        "Ikuti berbagai program pelatihan dan pengembangan profesional untuk meningkatkan kompetensi mengajar Anda.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-[76vh] max-h-[548px] min-h-[456px] w-[458px] overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white">
      <BackgroundCircles />
      <div className="relative flex h-full w-full flex-col justify-between p-6">
        {/* Image Container */}
        <div className="relative h-[60%] overflow-hidden rounded-lg">
          <div className="flex h-full transition-transform duration-500 ease-in-out">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`min-w-full h-full flex items-center justify-center ${
                  index === currentSlide ? "opacity-100" : "opacity-0 absolute"
                } transition-opacity duration-500`}
              >
                <Image
                  alt={`Slide ${index + 1}`}
                  src={image}
                  width={400}
                  height={250}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <Content
          title={carouselContent[currentSlide].title}
          description={carouselContent[currentSlide].description}
          currentSlide={currentSlide}
          totalSlides={carouselImages.length}
          goToSlide={goToSlide}
        />
      </div>
    </section>
  );
};

const BackgroundCircles: FC = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0">
      <div className="absolute left-[244px] top-[-213px] h-[339px] w-[381px] rounded-full bg-[#17a2b8]/20" />
      <div className="absolute left-[-37px] top-[-198px] h-[339px] w-[381px] rounded-full bg-[#17a2b8]/20" />
    </div>
  </div>
);

const Content: FC<{
  title: string;
  description: string;
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
}> = ({ title, description, currentSlide, totalSlides, goToSlide }) => (
  <div className="flex flex-col items-center gap-4 p-2.5">
    <h2 className="text-center text-base font-bold text-[#17191c]">
      {title}
    </h2>
    <p className="text-center text-sm font-normal text-[#17191c]">
      {description}
    </p>
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`transition-all duration-300 ${
            index === currentSlide
              ? "h-1.5 w-6 rounded-lg bg-[#007bff]"
              : "h-1.5 w-1.5 rounded-lg bg-[#a7a7a7] hover:bg-[#007bff]/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
);
