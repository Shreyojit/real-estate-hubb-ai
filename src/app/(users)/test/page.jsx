// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ArrowLeft } from 'lucide-react'; 
// import useBookingStore from '@/store/bookingStore';
// import { differenceInDays } from 'date-fns';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // Set your Stripe public key in the .env file

// const BookingDetails = () => {
//   const bookingId = '4db0a24c-8c5c-4ec6-94c4-efdc32aa76b1';
//   const getBookingById = useBookingStore((state) => state.getBookingById);
//   const updateBooking = useBookingStore((state) => state.updateBooking);
//   const [booking, setBooking] = useState(null);
//   const [editingDates, setEditingDates] = useState(false);
//   const [editingGuests, setEditingGuests] = useState(false);
//   const [guestCount, setGuestCount] = useState(0);
//   const [newStartDate, setNewStartDate] = useState('');
//   const [newEndDate, setNewEndDate] = useState('');

//   useEffect(() => {
//     const fetchedBooking = getBookingById(bookingId);
//     setBooking(fetchedBooking);
//     setGuestCount(fetchedBooking?.room.guestCount || 0);
//     setNewStartDate(fetchedBooking?.startDate || '');
//     setNewEndDate(fetchedBooking?.endDate || '');
//   }, [bookingId, getBookingById]);

//   const calculateTotalPrice = (startDate, endDate) => {
//     if (booking) {
//       const reservedDays = differenceInDays(new Date(endDate), new Date(startDate)) || 1;
//       const roomTotal = reservedDays * booking.room.roomPrice;
//       const breakfastTotal = reservedDays * booking.room.breakfastPrice;
//       return roomTotal + breakfastTotal;
//     }
//     return 0;
//   };

//   const handleUpdateDates = () => {
//     if (booking) {
//       const updatedBooking = {
//         ...booking,
//         startDate: newStartDate,
//         endDate: newEndDate,
//         totalPrice: calculateTotalPrice(newStartDate, newEndDate),
//       };
//       updateBooking(updatedBooking);
//       setBooking(updatedBooking);
//       setEditingDates(false);
//     }
//   };

//   const handleUpdateGuests = () => {
//     if (booking) {
//       const updatedBooking = {
//         ...booking,
//         room: {
//           ...booking.room,
//           guestCount: guestCount,
//         },
//       };
//       updateBooking(updatedBooking);
//       setBooking(updatedBooking);
//       setGuestCount(guestCount);
//       setEditingGuests(false);
//     }
//   };

//   const handlePayNow = async () => {
//     const stripe = await stripePromise;

//     const totalPrice = calculateTotalPrice(newStartDate, newEndDate);
//     const tax = totalPrice * 0.15; // 15% tax
//     const totalWithTax = totalPrice + tax;

//     // Create a checkout session
//     const response = await fetch('/api/create-checkout-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ totalWithTax }),
//     });

//     const session = await response.json();

//     // Redirect to Checkout
//     const result = await stripe.redirectToCheckout({ sessionId: session.id });

//     if (result.error) {
//       console.error(result.error.message);
//     }
//   };

//   if (!booking) {
//     return <div className="p-4">No booking found with the given ID.</div>;
//   }

//   const reservedDays = differenceInDays(new Date(newEndDate), new Date(newStartDate)) || 1;
//   const totalPrice = calculateTotalPrice(newStartDate, newEndDate);
//   const tax = totalPrice * 0.15; // 15% tax
//   const totalWithTax = totalPrice + tax; // Total including tax

//   return (
//     <div className="flex flex-col md:flex-row justify-between p-4 gap-5">
//       {/* Left Side */}
//       <div className="md:w-1/2 flex flex-col justify-between border-r border-gray-300 pr-4 ">
//         <div>
//           <a href="#" className="flex items-center text-gray-600 mb-4">
//             <ArrowLeft className="mr-1" /> Request to Book
//           </a>
//           <div className="mb-4">
//             <p className="font-semibold">Booking ID: {booking.id}</p>
//             <div className="flex justify-between mt-2">
//               <span>Dates:</span>
//               <span>
//                 {new Date(booking.startDate).toLocaleDateString()} -{' '}
//                 {new Date(booking.endDate).toLocaleDateString()}
//               </span>
//               <button
//                 className="ml-2 text-gray-500 underline cursor-pointer"
//                 onClick={() => setEditingDates(!editingDates)}
//               >
//                 Edit
//               </button>
//             </div>
//             {editingDates && (
//               <div className="flex flex-col mt-2">
//                 <input
//                   type="date"
//                   value={newStartDate.split('T')[0]}
//                   onChange={(e) => setNewStartDate(e.target.value)}
//                   className='mt-2'
//                 />
//                 <input
//                   type="date"
//                   value={newEndDate.split('T')[0]}
//                   onChange={(e) => setNewEndDate(e.target.value)}
//                   className='mt-2'
//                 />
//                 <button
//                   className="bg-gray-800 text-white py-1 px-3 mt-2 rounded"
//                   onClick={handleUpdateDates}
//                 >
//                   Save Dates
//                 </button>
//               </div>
//             )}
//             <div className="flex justify-between mt-2">
//               <span>Guests:</span>
//               <span>{booking.room.guestCount}</span>
//               <button
//                 className="ml-2 text-gray-500 underline cursor-pointer"
//                 onClick={() => setEditingGuests(!editingGuests)}
//               >
//                 Edit
//               </button>
//             </div>
//             {editingGuests && (
//               <div className="flex flex-col mt-2">
//                 <input
//                   type="number"
//                   value={guestCount}
//                   onChange={(e) => setGuestCount(Number(e.target.value))}
//                   min="1"
//                 />
//                 <button
//                   className="bg-blue-500 text-white py-1 px-3 mt-2 rounded"
//                   onClick={handleUpdateGuests}
//                 >
//                   Save Guests
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <br/>

//         <div className="border-t mt-4 pt-2">
//           <div className="flex justify-between">
//             <span>Number of Days:</span>
//             <span>{reservedDays}</span>
//           </div>
//         </div>
//         <button className="bg-red-500 text-white py-2 px-4 rounded mt-4">
//           Delete
//         </button>
//       </div>

//       {/* Right Side */}
//       <div className="md:w-1/2 flex flex-col">
//         <div className="border p-4 mb-4 rounded-lg shadow">
//           <div className="flex justify-between mb-2">
//             <div>
//               {booking.hotel.photos && booking.hotel.photos.length > 0 ? (
//                 <img
//                   src={booking.hotel.photos[0]}
//                   alt={booking.hotel.title}
//                   className="w-24 h-24 rounded object-cover"
//                 />
//               ) : (
//                 <div className="w-24 h-24 bg-gray-200 rounded"></div>
//               )}
//             </div>
//             <div className="flex-1 pl-4">
//               <h3 className="font-bold">{booking.hotel.title}</h3>
//               <p>{booking.hotel.description}</p>
//               <p>{booking.hotel.address}</p>
//             </div>
//           </div>
//           <div className="border-t mt-4 pt-2">
//             <div className="flex justify-between">
//               <span>Price:</span>
//               <span>${booking.room.roomPrice.toFixed(2)} per night</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Breakfast Price:</span>
//               <span>${booking.room.breakfastPrice.toFixed(2)} per day</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Tax (15%):</span>
//               <span>${tax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold">
//               <span>Total (USD):</span>
//               <span>${totalWithTax.toFixed(2)}</span>
//             </div>
          

// <div className="p-4 mb-4 flex flex-1 justify-center border-none ">
//   <button 
//     className="bg-primary text-white py-2 px-4 rounded " 
//   onClick={handlePayNow}
//   >
//     Pay Now
//   </button>
// </div>
    
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetails;










'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react'; 
import useBookingStore from '@/store/bookingStore';
import { differenceInDays } from 'date-fns';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY); // Set your Stripe public key in the .env file

const BookingDetails = () => {
  const bookingId = '4db0a24c-8c5c-4ec6-94c4-efdc32aa76b1';
  const getBookingById = useBookingStore((state) => state.getBookingById);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const [booking, setBooking] = useState(null);
  const [editingDates, setEditingDates] = useState(false);
  const [editingGuests, setEditingGuests] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    const fetchedBooking = getBookingById(bookingId);
    setBooking(fetchedBooking);
    setGuestCount(fetchedBooking?.room.guestCount || 0);
    setNewStartDate(fetchedBooking?.startDate || '');
    setNewEndDate(fetchedBooking?.endDate || '');
  }, [bookingId, getBookingById]);

  const calculateTotalPrice = (startDate, endDate) => {
    if (booking) {
      const reservedDays = differenceInDays(new Date(endDate), new Date(startDate)) || 1;
      const roomTotal = reservedDays * booking.room.roomPrice;
      const breakfastTotal = reservedDays * booking.room.breakfastPrice;
      return roomTotal + breakfastTotal;
    }
    return 0;
  };

  const handleUpdateDates = () => {
    if (booking) {
      const updatedBooking = {
        ...booking,
        startDate: newStartDate,
        endDate: newEndDate,
        totalPrice: calculateTotalPrice(newStartDate, newEndDate),
      };
      updateBooking(updatedBooking);
      setBooking(updatedBooking);
      setEditingDates(false);
    }
  };

  const handleUpdateGuests = () => {
    if (booking) {
      const updatedBooking = {
        ...booking,
        room: {
          ...booking.room,
          guestCount: guestCount,
        },
      };
      updateBooking(updatedBooking);
      setBooking(updatedBooking);
      setGuestCount(guestCount);
      setEditingGuests(false);
    }
  };

  const handlePayNow = async () => {
    const stripe = await stripePromise;
  
    const totalPrice = calculateTotalPrice(newStartDate, newEndDate);
    const tax = totalPrice * 0.15; // 15% tax
    const totalWithTax = totalPrice + tax;
  
    console.log("Booking ID:", bookingId); // Log the booking ID
    console.log("Total Price (before tax):", totalPrice); // Log the total price before tax
    console.log("Tax:", tax); // Log the tax amount
    console.log("Total with Tax:", totalWithTax); // Log the total amount with tax
  
    // Create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalWithTax, bookingId }), // Include bookingId in the request body
    });
  
    if (!response.ok) {
      console.error("Error creating checkout session", response.status, response.statusText); // Log error response status
      return;
    }
  
    const session = await response.json();
    console.log("Checkout Session:", session); // Log the session object
  
    // Redirect to Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
    if (result.error) {
      console.error("Stripe Redirect Error:", result.error.message); // Log Stripe redirect error
    }
  };
  

  if (!booking) {
    return <div className="p-4">No booking found with the given ID.</div>;
  }

  const reservedDays = differenceInDays(new Date(newEndDate), new Date(newStartDate)) || 1;
  const totalPrice = calculateTotalPrice(newStartDate, newEndDate);
  const tax = totalPrice * 0.15; // 15% tax
  const totalWithTax = totalPrice + tax; // Total including tax

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 gap-5">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-between border-r border-gray-300 pr-4 ">
        <div>
          <a href="#" className="flex items-center text-gray-600 mb-4">
            <ArrowLeft className="mr-1" /> Request to Book
          </a>
          <div className="mb-4">
            <p className="font-semibold">Booking ID: {booking.id}</p>
            <div className="flex justify-between mt-2">
              <span>Dates:</span>
              <span>
                {new Date(booking.startDate).toLocaleDateString()} -{' '}
                {new Date(booking.endDate).toLocaleDateString()}
              </span>
              <button
                className="ml-2 text-gray-500 underline cursor-pointer"
                onClick={() => setEditingDates(!editingDates)}
              >
                Edit
              </button>
            </div>
            {editingDates && (
              <div className="flex flex-col mt-2">
                <input
                  type="date"
                  value={newStartDate.split('T')[0]}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className='mt-2'
                />
                <input
                  type="date"
                  value={newEndDate.split('T')[0]}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className='mt-2'
                />
                <button
                  className="bg-gray-800 text-white py-1 px-3 mt-2 rounded"
                  onClick={handleUpdateDates}
                >
                  Save Dates
                </button>
              </div>
            )}
            <div className="flex justify-between mt-2">
              <span>Guests:</span>
              <span>{booking.room.guestCount}</span>
              <button
                className="ml-2 text-gray-500 underline cursor-pointer"
                onClick={() => setEditingGuests(!editingGuests)}
              >
                Edit
              </button>
            </div>
            {editingGuests && (
              <div className="flex flex-col mt-2">
                <input
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  min="1"
                />
                <button
                  className="bg-blue-500 text-white py-1 px-3 mt-2 rounded"
                  onClick={handleUpdateGuests}
                >
                  Save Guests
                </button>
              </div>
            )}
          </div>
        </div>
        <br/>

        <div className="border-t mt-4 pt-2">
          <div className="flex justify-between">
            <span>Number of Days:</span>
            <span>{reservedDays}</span>
          </div>
        </div>
        <button className="bg-red-500 text-white py-2 px-4 rounded mt-4">
          Delete
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex flex-col">
        <div className="border p-4 mb-4 rounded-lg shadow">
          <div className="flex justify-between mb-2">
            <div>
              {booking.hotel.photos && booking.hotel.photos.length > 0 ? (
                <img
                  src={booking.hotel.photos[0]}
                  alt={booking.hotel.title}
                  className="w-24 h-24 rounded object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
              )}
            </div>
            <div className="flex-1 pl-4">
              <h3 className="font-bold">{booking.hotel.title}</h3>
              <p>{booking.hotel.description}</p>
              <p>{booking.hotel.address}</p>
            </div>
          </div>
          <div className="border-t mt-4 pt-2">
            <div className="flex justify-between">
              <span>Price:</span>
              <span>${booking.room.roomPrice.toFixed(2)} per night</span>
            </div>
            <div className="flex justify-between">
              <span>Breakfast Price:</span>
              <span>${booking.room.breakfastPrice.toFixed(2)} per day</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (15%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total (USD):</span>
              <span>${totalWithTax.toFixed(2)}</span>
            </div>
          
            <div className="p-4 mb-4 flex flex-1 justify-center border-none ">
              <button 
                className="bg-primary text-white py-2 px-4 rounded " 
                onClick={handlePayNow}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
















