import BookingDates from '@/components/BookingDates';
import React from 'react';

const bookings = [
  {
    _id: '1',
    place: {
      title: 'Cozy Cottage in the Woods',
      image: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    price: 120,
    checkIn: '2024-10-01',
    checkOut: '2024-10-05',
  },
  {
    _id: '2',
    place: {
      title: 'Luxury Apartment Downtown',
      image: 'https://via.placeholder.com/150',
    },
    price: 250,
    checkIn: '2024-10-10',
    checkOut: '2024-10-15',
  },
  {
    _id: '3',
    place: {
      title: 'Beachfront Villa',
      image: 'https://via.placeholder.com/150',
    },
    price: 300,
    checkIn: '2024-10-20',
    checkOut: '2024-10-25',
  },
  {
    _id: '4',
    place: {
      title: 'Modern Loft',
      image: 'https://via.placeholder.com/150',
    },
    price: 180,
    checkIn: '2024-10-05',
    checkOut: '2024-10-08',
  },
  {
    _id: '5',
    place: {
      title: 'Rustic Cabin',
      image: 'https://via.placeholder.com/150',
    },
    price: 150,
    checkIn: '2024-10-12',
    checkOut: '2024-10-16',
  },
];

const BookingsList = () => {
  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking._id} className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden p-4 mb-4">
          <div className="w-48">
            <img src={booking.place.image} alt={booking.place.title} className="object-cover" />
          </div>
          <div className="py-3 pr-3 grow">
            <h2 className="text-xl">{booking.place.title}</h2>
            <BookingDates booking={booking} className="my-2" />
            <div className="flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
              <span className="text-2xl">Total price: ${booking.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;
