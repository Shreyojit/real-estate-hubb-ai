'use client';
import React, { Suspense } from 'react';
import Image from "next/image";
import { MapFilterItems } from "@/components/MapFilterItems";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { hotels } from "@/lib/homePageData";
import { useState } from "react";

function Home() {
  const searchParams = useSearchParams();
  
  

  console.log("searchParams--->", searchParams);
  const selectedCategory = searchParams.get("filter");

  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    country: searchParams.get("country") || "",
    state: searchParams.get("state") || "",
    searchText: searchParams.get("searchText") || "",
  });

  const handleSearchChange = (filters) => {
    setSearchFilters(filters);
  };

  // Filter hotels based on the selected category and search criteria
  const filteredHotels = hotels.filter(hotel => {
    const hotelCategory = hotel.category.toLowerCase();
    const hotelCountry = hotel.country.toLowerCase();
    const hotelState = hotel.state.toLowerCase();
    const hotelTitle = hotel.title.toLowerCase();
    const hotelDescription = hotel.description.toLowerCase();
    const hotelPerks = hotel.perks.map(perk => perk.toLowerCase());

    // Check if hotel category matches the selected category
    const matchesCategory = selectedCategory 
        ? hotelCategory === selectedCategory.toLowerCase() 
        : true;

    // Check if the country matches the search filter
    const matchesCountry = searchFilters.country
        ? hotelCountry.includes(searchFilters.country.toLowerCase())
        : true;

    // Check if the state matches the search filter
    const matchesState = searchFilters.state
        ? hotelState.includes(searchFilters.state.toLowerCase())
        : true;

    // Check if searchText matches title, description, or perks
    const searchTextLower = searchFilters.searchText.toLowerCase();
    const matchesSearchText = searchFilters.searchText
        ? hotelTitle.includes(searchTextLower) ||  // Matches Title
          hotelDescription.includes(searchTextLower) || // Matches Description
          hotelPerks.some(perk => perk.includes(searchTextLower)) // Matches Perks
        : true;

    // Return true if all of the filters match
    return matchesCategory && matchesCountry && matchesState && matchesSearchText;
  });

  console.log("Filtered Hotels--->", filteredHotels);

  return (
    <div className="mt-8">
      <div className="m-5">
        <MapFilterItems 
          onSearchChange={handleSearchChange} 
          searchFilters={searchFilters} // Pass down the search filters
        />
      </div>

      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {filteredHotels.length === 0 ? (
          <p>No hotels found based on the applied filters.</p> // Display a message if no hotels match
        ) : (
          filteredHotels.map(hotel => (
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
