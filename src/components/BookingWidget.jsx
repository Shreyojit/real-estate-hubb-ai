import "react-date-range/dist/styles.css"; // main CSS file
import "react-date-range/dist/theme/default.css"; // theme CSS file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval, format } from "date-fns";

export function BookingWidget({ hotel, selectedRoom }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Find the room based on the selectedRoom ID
  const room = hotel.rooms.find((room) => room.id === selectedRoom);

  // Log the room to inspect the data
  console.log("Room data: ", room);

  // Convert the room's reservations to a list of all reserved dates
  const disabledDates = room?.reservations.flatMap((reservationItem) => {
    const startDate = new Date(reservationItem.startDate);
    const endDate = new Date(reservationItem.endDate);

    console.log("Reservation: ", reservationItem); // Log individual reservations

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }) || [];

  console.log("Disabled Dates are-->", disabledDates);

  // Function to disable dates within the reserved dates
  const isDateDisabled = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return disabledDates.some(
      (disabledDate) => format(disabledDate, "yyyy-MM-dd") === formattedDate
    );
  };

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
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
          
          // Log the date and its disabled status
          console.log(`Date: ${date.toDateString()} - Disabled: ${isDisabled}`);

          // Return clickable or non-clickable date
          return (
            <span style={{ color: isDisabled ? 'lightgray' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
              {date.getDate()}
            </span>
          );
        }}
        dayContentStyle={(date) => ({
          color: isDateDisabled(date) ? 'lightgray' : 'black',
          pointerEvents: isDateDisabled(date) ? 'none' : 'auto',
        })}
        disabledDay={isDateDisabled} // Function to disable dates in the picker
      />
    </>
  );
}
