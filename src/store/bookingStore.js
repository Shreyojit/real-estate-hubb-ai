// // store/bookingStore.js

// import { create } from "zustand";

// const useBookingStore = create((set) => ({
//   bookings: JSON.parse(localStorage.getItem("bookings")) || [], // Load from local storage

//   addBooking: (booking) => {
//     set((state) => {
//       const newBookings = [...state.bookings, booking];
//       localStorage.setItem("bookings", JSON.stringify(newBookings)); // Update local storage
//       return { bookings: newBookings };
//     });
//   },

//   updateBooking: (updatedBooking) => {
//     set((state) => {
//       const updatedBookings = state.bookings.map((booking) =>
//         booking.id === updatedBooking.id ? updatedBooking : booking
//       );
//       localStorage.setItem("bookings", JSON.stringify(updatedBookings)); // Update local storage
//       return { bookings: updatedBookings };
//     });
//   },

//   clearBookings: () => {
//     set({ bookings: [] });
//     localStorage.removeItem("bookings"); // Clear local storage
//   },

//   getBookings: () => {
//     return JSON.parse(localStorage.getItem("bookings")) || []; // Return bookings from local storage
//   },

//   getBookingById: (id) => {
//     const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     return bookings.find((booking) => booking.id === id) || null; // Return booking by ID or null if not found
//   },
// }));

// export default useBookingStore;



// store/bookingStore.js

import { create } from "zustand";

const useBookingStore = create((set) => ({
  bookings: [], // Initialize with an empty array

  // Load bookings from local storage when in the browser
  initialize: () => {
    if (typeof window !== "undefined") {
      const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      set({ bookings: savedBookings });
    }
  },

  addBooking: (booking) => {
    set((state) => {
      const newBookings = [...state.bookings, booking];
      if (typeof window !== "undefined") {
        localStorage.setItem("bookings", JSON.stringify(newBookings)); // Update local storage
      }
      return { bookings: newBookings };
    });
  },

  updateBooking: (updatedBooking) => {
    set((state) => {
      const updatedBookings = state.bookings.map((booking) =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("bookings", JSON.stringify(updatedBookings)); // Update local storage
      }
      return { bookings: updatedBookings };
    });
  },

  clearBookings: () => {
    set({ bookings: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem("bookings"); // Clear local storage
    }
  },

  getBookings: () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("bookings")) || []; // Return bookings from local storage
    }
    return []; // Fallback for SSR
  },

  getBookingById: (id) => {
    if (typeof window !== "undefined") {
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      return bookings.find((booking) => booking.id === id) || null; // Return booking by ID or null if not found
    }
    return null; // Fallback for SSR
  },
}));

export default useBookingStore;
