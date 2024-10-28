'use client'
import AddressLink from '@/components/AddressLink';
import { BookingWidget } from '@/components/BookingWidget';

import PlaceGallery from '@/components/PlaceGallery';
import React, { useState } from 'react'

const hotel = {
    id: 2,
    title: 'Mountain Retreat',
    address: '456 Hilltop Road',
    description: 'A serene retreat nestled in the mountains.',
    checkIn: '15:00',
    checkOut: '12:00',
    maxGuests: 6,
    price: 250,
    perks: ['mountain view', 'free breakfast', 'spa'],
    photos: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300',
      
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=300' ,
      'https://images.pexels.com/photos/1058759/pexels-photo-1058759.jpeg?auto=compress&cs=tinysrgb&w=300',
   
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300',

    ],
    rooms: [
      {
        id: 3,
        title: 'Mountain View Room',
        description: 'A room with stunning mountain views.',
        bedCount: 1,
        guestCount: 2,
        roomPrice: 100,
        bathroomCount: 1,
        freeWifi: true,
        airCondition: true,
        roomService: true,
        balcony: true,
        soundProof: false,
        kingBed: 1,
        queenBed: 0,
        forestView: false,
        cityView: false,
        oceanView: false,
        breakfastPrice: 12,
        addedPhotos: [
            'https://images.pexels.com/photos/14750392/pexels-photo-14750392.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/24877216/pexels-photo-24877216/free-photo-of-a-woman-sitting-on-a-bed-in-a-room.jpeg?auto=compress&cs=tinysrgb&w=300',
          ],
        reservations: [
          { userId: 'user1', startDate: '2024-10-15', endDate: '2024-10-17' },
          { userId: 'user2', startDate: '2024-11-01', endDate: '2024-11-05' },
        ],
      },
      {
        id: 4,
        title: 'Suite with Balcony',
        description: 'A luxurious suite with a private balcony.',
        bedCount: 2,
        guestCount: 4,
        roomPrice: 180,
        bathroomCount: 2,
        freeWifi: true,
        airCondition: true,
        roomService: true,
        balcony: true,
        soundProof: true,
        kingBed: 1,
        queenBed: 1,
        forestView: true,
        cityView: true,
        oceanView: false,
        breakfastPrice: 20,
        addedPhotos: [
            'https://images.pexels.com/photos/14750392/pexels-photo-14750392.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/24877216/pexels-photo-24877216/free-photo-of-a-woman-sitting-on-a-bed-in-a-room.jpeg?auto=compress&cs=tinysrgb&w=300',
          ],
        reservations: [
          { userId: 'user1', startDate: '2024-10-15', endDate: '2024-10-17' },
          { userId: 'user2', startDate: '2024-11-01', endDate: '2024-11-05' },
        ],
      },
    ],
  };
  
  
  

  export default function PlaceDetailsPage() {
    
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]?.id);

    const handleSelectRoom = (roomId) => {
      setSelectedRoom(roomId);
      console.log(`selecting roomindex: ${roomId}`);
    };

  
    return (
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{hotel.title}</h1>
        <AddressLink>{hotel.address}</AddressLink>
        <PlaceGallery hotel={hotel} />
  
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{hotel.description}</p>
            <p>Check-in: {hotel.checkIn}</p>
            <p>Check-out: {hotel.checkOut}</p>
            <p>Max number of guests: {hotel.maxGuests}</p>
          </div>
  
          <BookingWidget hotel={hotel} selectedRoom={selectedRoom} />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {hotel.rooms.map((room) => (
        <div key={room.id} className="border rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedRoom === room.id}
                onChange={() => handleSelectRoom(room.id)}
                className="mr-2"
              />
              Select Room
            </label>
          </div>

          <h4 className="text-xl font-semibold mb-2">{room.title}</h4>
          <p className="text-sm text-gray-600 mb-4">{room.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {room.addedPhotos.map((photo, photoIndex) => (
              <div key={photoIndex} className="col-span-1">
                <img
                  src={photo}
                  alt={`Room photo ${photoIndex + 1}`}
                  className="aspect-square cursor-pointer object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 content-start text-sm mt-6">
            <div className="flex items-center gap-2">
              <span>{room.roomService ? 'Room Service Available' : 'No Room Service'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{room.freeWifi ? 'Free Wifi' : 'No Wifi'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{`Room Price: $${room.roomPrice}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{`Breakfast: $${room.breakfastPrice}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

      </div>
    );
  }
