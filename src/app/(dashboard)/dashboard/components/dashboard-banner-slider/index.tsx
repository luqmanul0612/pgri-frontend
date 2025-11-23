"use client";
import {
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  ReactNode,
  useState,
} from "react";
import Image, { StaticImageData } from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { cn } from "@/lib/utils";

interface Props {
  banners: { key: string; image: StaticImageData }[];
  className?: string;
}

const DashboardBannerSlider: FC<Props> = (props) => {
  const { banners, className } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        spacing: 16,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  const onClickNavigationButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    to: "prev" | "next",
  ) => {
    e.stopPropagation();
    if (to === "prev") {
      instanceRef.current?.prev();
    } else {
      instanceRef.current?.next();
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative w-full overflow-hidden rounded-[16px]">
        <div
          ref={sliderRef}
          className={cn("keen-slider transition-all", { "opacity-0": !loaded })}
        >
          {banners.map((banner) => (
            <div
              key={banner.key}
              className="keen-slider__slide relative aspect-[116/25] w-full overflow-hidden rounded-[16px]"
            >
              <Image
                src={banner.image}
                alt={banner.key}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <NavigationButton
              onClick={(e) => onClickNavigationButton(e, "prev")}
              to="prev"
            >
              <ArrowLeftIcon strokeWidth={3} />
            </NavigationButton>
            <NavigationButton
              onClick={(e) => onClickNavigationButton(e, "next")}
              to="next"
            >
              <ArrowRightIcon strokeWidth={3} />
            </NavigationButton>
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="mt-4 flex w-full justify-center gap-2">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={cn(
                  "h-[8px] min-h-[8px] min-w-[8px] rounded-full bg-slate-400 transition-all",
                  { "min-w-[25px] bg-teal-500": currentSlide === idx },
                )}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardBannerSlider;

type NavigationButtonProps = {
  children?: ReactNode;
  to: "prev" | "next";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const NavigationButton: FC<NavigationButtonProps> = ({
  children,
  to,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "absolute top-1/2 z-[999] box-border flex aspect-square h-[32px] min-h-5 w-[32px] rounded-full bg-slate-800/40 p-2 text-white transition-all hover:bg-teal-500",
        {
          "left-2": to === "prev",
          "right-2": to === "next",
        },
      )}
    >
      {children}
    </button>
  );
};
