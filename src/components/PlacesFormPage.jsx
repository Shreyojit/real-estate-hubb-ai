import React from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const placeSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    checkIn: z.string().min(1, { message: "Check-in time is required" }),
    checkOut: z.string().min(1, { message: "Check-out time is required" }),
    maxGuests: z.number().min(1, { message: "At least one guest is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    addedPhotos: z.array(z.string()).min(1, { message: "At least one photo is required" }),
    perks: z.array(z.string()).optional(),
    extraInfo: z.string().optional(),
  });
  


export default function PlacesFormPage() {
  return (
    <div>
      
    </div>
  )
}
