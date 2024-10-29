"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Slider from "react-slick";
import { categoryItems } from "@/lib/categoryItems";

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 10, // Show 10 icons in one slide
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export function MapFilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  return (
    <div className="mt-5 w-full relative">
      <Slider {...settings}>
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            href={`${pathname}?${createQueryString("filter", item.name)}`}
            className={`flex flex-col gap-y-3 items-center ${
              search === item.name ? "border-b-2 border-black pb-2" : "opacity-70"
            }`}
          >
            <div className="relative w-6 h-6">
              <Image
                src={item.imageUrl}
                alt="Category image"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium">{item.title}</p>
          </Link>
        ))}
      </Slider>

      {/* Add custom button styles */}
      <style jsx>{`
        .slick-prev, .slick-next {
          z-index: 1; /* Ensure buttons are above other elements */
          color: black; /* Change arrow color to black */
        }
        .slick-prev {
          left: 10px; /* Adjust position of the left button */
        }
        .slick-next {
          right: 10px; /* Adjust position of the right button */
        }
      `}</style>
    </div>
  );
}
