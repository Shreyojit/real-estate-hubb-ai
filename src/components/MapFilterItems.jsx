"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { categoryItems } from "@/lib/categoryItems";

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 10,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
  ],
};

export function MapFilterItems({ onSearchChange }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  // Function to clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("filter");
    params.delete("country");
    params.delete("state");
    params.delete("searchText");
    window.location.href = `${pathname}?${params.toString()}`;
  };

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

      {/* Search Component */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Search Hotels</h2>
        <form
          className="flex flex-row gap-4 mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const country = formData.get("country");
            const state = formData.get("state");
            const searchText = formData.get("searchText");

            const params = new URLSearchParams(searchParams.toString());
            if (country) params.set("country", country);
            if (state) params.set("state", state);
            if (searchText) params.set("searchText", searchText);

            window.location.href = `${pathname}?${params.toString()}`;
          }}
        >
          <input
            name="country"
            type="text"
            placeholder="Country"
            className="border p-2 rounded "
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            className="border p-2 rounded "
          />
          <input
            name="searchText"
            type="text"
            placeholder="Search by title, description, or perks"
            className="border p-2 rounded flex-grow "
          />
          <button type="submit" className="bg-gray-500 text-white p-2 rounded flex-grow">Search</button>
        </form>

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="mt-4 bg-primary text-white p-2 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
