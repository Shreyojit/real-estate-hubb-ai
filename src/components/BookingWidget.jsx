// Import statements
import "react-date-range/dist/styles.css"; // main CSS file
import "react-date-range/dist/theme/default.css"; // theme CSS file
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";
import { eachDayOfInterval, format, differenceInDays } from "date-fns";
import useBookingStore from "@/store/bookingStore"; // Adjust path if needed
import toast from "react-hot-toast";

import { v4 as uuidv4 } from "uuid"; // Install 'uuid' package for unique IDs
import { useRouter } from "next/navigation";

export function BookingWidget({ hotel, selectedRoom }) {
  const router = useRouter();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const addBooking = useBookingStore((state) => state.addBooking);
  const room = hotel.rooms.find((room) => room.id === selectedRoom);

  const disabledDates = room?.reservations.flatMap((reservationItem) => {
    const startDate = new Date(reservationItem.startDate);
    const endDate = new Date(reservationItem.endDate);

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }) || [];

  const [roomTotal, setRoomTotal] = useState(0);
  const [breakfastTotal, setBreakfastTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const isDateDisabled = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return disabledDates.some(
      (disabledDate) => format(disabledDate, "yyyy-MM-dd") === formattedDate
    );
  };

  useEffect(() => {
    const reservedDays = differenceInDays(state[0].endDate, state[0].startDate) || 1;
    const calculatedRoomTotal = room ? reservedDays * room.roomPrice : 0;
    const calculatedBreakfastTotal = room ? reservedDays * room.breakfastPrice : 0;

    setRoomTotal(calculatedRoomTotal);
    setBreakfastTotal(calculatedBreakfastTotal);
    setTotalPrice(calculatedRoomTotal + calculatedBreakfastTotal);
  }, [room, state]);

  const handleBooking = () => {
    const bookingId = uuidv4(); // Generate unique booking ID
    const newBooking = {
      id: bookingId,
      hotel, // Entire hotel details
      room, // Entire room details
      startDate: state[0].startDate,
      endDate: state[0].endDate,
      roomTotal,
      breakfastTotal,
      totalPrice,
    };
    
    console.log("Created booking--->", newBooking);
    addBooking(newBooking);
  
    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
  
    // Toast notification
    toast.success(`Booking successful! Booking ID: ${bookingId}`, {
      duration: 4000,
      position: "top-right",
    });
  
    // Redirect to account page with bookingId
    router.push(`/account/${bookingId}`);
  };
  

  return (
    <div className="relative p-4 border rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        ranges={state}
        rangeColors={['#FF5A5F']}
        onChange={(item) => setState([item.selection])}
        minDate={new Date()}
        direction="vertical"
        dayContentRenderer={(date) => {
          const isDisabled = isDateDisabled(date);
          return (
            <span style={{ color: isDisabled ? 'lightgray' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
              {date.getDate()}
            </span>
          );
        }}
        disabledDay={isDateDisabled}
      />

      <div className="mt-4 container text-sm">
        <p><strong>Room Price:</strong> ${room?.roomPrice} per night</p>
        <p><strong>Breakfast Price:</strong> ${room?.breakfastPrice} per day</p>
        <p><strong>Total Days:</strong> {differenceInDays(state[0].endDate, state[0].startDate) || 1}</p>
        <p><strong>Total Room Cost:</strong> ${roomTotal}</p>
        <p><strong>Total Breakfast Cost:</strong> ${breakfastTotal}</p>
        <p className="font-semibold text-lg mt-2">Total Cost: ${totalPrice}</p>
      </div>

      <button
        onClick={handleBooking}
        className="mt-4 bg-red-500 text-dark font-semibold py-2 px-4 rounded hover:bg-red-600"
      >
        Reserve or Book Now
      </button>
    </div>
  );
}
