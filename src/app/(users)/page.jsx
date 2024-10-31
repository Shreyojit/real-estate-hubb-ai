'use client';
import React, { Suspense, useState } from 'react';
import Image from "next/image";
import { MapFilterItems } from "@/components/MapFilterItems";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { hotels } from "@/lib/homePageData";


function Home() {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("filter");

 
  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    country: searchParams.get("country") || "",
    state: searchParams.get("state") || "",
    searchText: searchParams.get("searchText") || "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6; 

  const handleSearchChange = (filters) => {
    setSearchFilters(filters);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter hotels based on the selected category and search criteria
  const filteredHotels = hotels.filter(hotel => {
    const hotelCategory = hotel.category.toLowerCase();
    const hotelCountry = hotel.country.toLowerCase();
    const hotelState = hotel.state.toLowerCase();
    const hotelTitle = hotel.title.toLowerCase();
    const hotelDescription = hotel.description.toLowerCase();
    const hotelPerks = hotel.perks.map(perk => perk.toLowerCase());

    const matchesCategory = selectedCategory 
        ? hotelCategory === selectedCategory.toLowerCase() 
        : true;

    const matchesCountry = searchFilters.country
        ? hotelCountry.includes(searchFilters.country.toLowerCase())
        : true;

    const matchesState = searchFilters.state
        ? hotelState.includes(searchFilters.state.toLowerCase())
        : true;

    const searchTextLower = searchFilters.searchText.toLowerCase();
    const matchesSearchText = searchFilters.searchText
        ? hotelTitle.includes(searchTextLower) ||  
          hotelDescription.includes(searchTextLower) || 
          hotelPerks.some(perk => perk.includes(searchTextLower))
        : true;

    return matchesCategory && matchesCountry && matchesState && matchesSearchText;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  console.log("currentHotels--->", currentHotels);
  console.log("Current Page:", currentPage); // Debugging line

  // Handler for next page button
  const handleNextPage = () => {
    setCurrentPage(prev => {
      const newPage = Math.min(prev + 1, totalPages);
      console.log("Next Page:", newPage); // Debugging line
      return newPage;
    });
  };

  return (
    <div className="mt-8">
      <div className="m-5">
        <MapFilterItems 
          onSearchChange={handleSearchChange} 
          searchFilters={searchFilters} 
        />
      </div>

      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {currentHotels.length === 0 ? (
          <p>No hotels found based on the applied filters.</p>
        ) : (
          currentHotels.map(hotel => (
            <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
              <div className="bg-white mb-2 rounded-2xl flex flex-col ">
                {hotel.photos?.[0] && (
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    src={hotel.photos[0]}
                    alt={hotel.title}
                    width={300}
                    height={300}
                  />
                )}
                <h2 className="font-bold mt-2">{hotel.title}</h2>
                <h3 className="text-sm text-gray-500">{hotel.address}</h3>
                <div className="mt-1">
                  <span className="font-bold">${hotel.price}</span> per night
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg mx-2"
        >
          Previous
        </button>
        <span className="flex items-center mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
