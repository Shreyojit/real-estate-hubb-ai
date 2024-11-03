'use client';

import Modal from '@/components/test-components/Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Perks from '@/components/Perks';
import PhotosUploader from '@/components/PhotoUploader';
import { useSession } from 'next-auth/react';

// Define Zod schema for product form
const productSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    maxGuests: z.number().min(1, { message: "At least one guest is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    addedPhotos: z.array(z.string()).optional(),
    perks: z.array(z.string()).optional(),
    extraInfo: z.string().optional(),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
});










const ProductForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
        title: "",
        address: "",
        addedPhotos: [],
        description: "",
        perks: [],
        extraInfo: "",
        checkIn: "",
        checkOut: "",
        maxGuests: 1,
        price: 100,
        country: "", // Default country value
            state: "",   // Default state value
            city:"",

    },
  });

  const [modalDataArray, setModalDataArray] = useState([]); // Array to store multiple modal data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);


  const fileNames = addedPhotos.map(photo => photo.name).join(', '); // Assuming addedPhotos is an array of objects

  // const onSubmit = (data) => {
  //   const fullProductData = {
  //     ...data,
  //     addedPhotos: addedPhotos,
  //     perks: perks,
  //     modalDetails: modalDataArray, // Add modal data array to form data
  //   };

  //   // Store in local storage and log to console
  //   localStorage.setItem('productData', JSON.stringify(fullProductData));
  //   console.log(fullProductData);

  //   reset(); // Reset the form after submission
  //   setModalDataArray([]); // Clear modal data array after submission
  // };









  const onSubmit = async (data) => {

    console.log("data is--->",data)

    const updatedModalDataArray = modalDataArray.map(room => ({
      ...room,
      images: room.addedPhotos, // Rename addedPhotos to images
      addedPhotos: undefined,    // Remove addedPhotos from the object
  }));


    const fullProductData = {
      ...data,
      images:addedPhotos,
      perks,
     
      rooms: updatedModalDataArray,
    };

    console.log("Sending data to backend:", fullProductData); // Log data before sending to backend

    try {
      const createdHotel = await createHotelWithRooms(fullProductData);
      console.log("Created hotel:", createdHotel);

      // Reset the form and modal data array after successful submission
      reset();
      setModalDataArray([]);
      setAddedPhotos([]);
      setPerks([]);
      setSubmissionError(null);
    } catch (error) {
      console.error("Error creating hotel:", error);
      setSubmissionError(error.message || "Failed to create hotel");
    }
  };

  const createHotelWithRooms = async (hotelData) => {
    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create hotel');
      }

      const hotel = await response.json();
      return hotel;
    } catch (error) {
      console.error('Error in createHotelWithRooms:', error);
      throw error;
    }
  };













  const handleModalSubmit = (newData) => {
    if (selectedRoom) {
        // Update existing room
        setModalDataArray((prevData) =>
            prevData.map((room, index) =>
                index === selectedRoom.index ? newData : room
            )
        );
    } else {
        // Add new room
        setModalDataArray((prevData) => [...prevData, newData]);
    }
    setIsModalOpen(false);
    setSelectedRoom(null); // Reset selected room after submission
};

const handleDelete = (index) => {
    setModalDataArray((prevData) => prevData.filter((_, i) => i !== index));
};

const handleEdit = (index) => {
    setSelectedRoom({ index, data: modalDataArray[index] });
    setIsModalOpen(true);
};

  const preInput = (label, description) => (
    <div>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {preInput('Title', 'Title for your place. Should be short and catchy like an advertisement')}
        <input
          {...register("title")}
          type="text"
          placeholder="e.g., My lovely apartment"
          className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        {preInput('Address', 'Address to this place')}
        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}


        {preInput('Country', 'Select your country')}
            <input
                {...register("country")}
                type="text"
                placeholder="e.g., United States"
                className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                aria-invalid={errors.country ? "true" : "false"}
            />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}

            {preInput('State', 'Select your state')}
            <input
                {...register("state")}
                type="text"
                placeholder="e.g., California"
                className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                aria-invalid={errors.state ? "true" : "false"}
            />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}

            {preInput('City', 'Enter the city')}
<input
    {...register("city")}
    type="text"
    placeholder="e.g., San Francisco"
    className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
    aria-invalid={errors.city ? "true" : "false"}
/>
{errors.city && <p className="text-red-500">{errors.city.message}</p>}







        {preInput('Photos', 'More = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {fileNames && <p className="mt-2 text-gray-700">Selected files: {fileNames}</p>}

        {preInput('Description', 'Description of the place')}
        <textarea
          {...register("description")}
          placeholder="Description of your place"
          className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        {preInput('Perks', 'Select all the perks of your place')}
        <Perks selected={perks} onChange={setPerks} />

        {preInput('Details', 'Details of the place')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check-in time</h3>
            <input
              {...register("checkIn")}
              type="text"
              placeholder="14"
              className={`w-full p-2 border rounded ${errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.checkIn && <p className="text-red-500">{errors.checkIn.message}</p>}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check-out time</h3>
            <input
              {...register("checkOut")}
              type="text"
              placeholder="11"
              className={`w-full p-2 border rounded ${errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.checkOut && <p className="text-red-500">{errors.checkOut.message}</p>}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              {...register("maxGuests", { valueAsNumber: true })}
              type="number"
              placeholder="1"
              className={`w-full p-2 border rounded ${errors.maxGuests ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.maxGuests && <p className="text-red-500">{errors.maxGuests.message}</p>}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="100"
              className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 px-4 h-10 mt-4 rounded-2xl"
        >
          Add Rooms
        </button>



           {/* Display multiple added modal data */}
          


  
            {/* Display multiple added modal data */}
<div className="p-4 bg-white rounded-lg shadow-md">
  <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>

  {/* Hotel Rooms Grid */}
  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
    {modalDataArray.map((room, index) => (
      <div key={room.id} className="border rounded-lg shadow-md p-4">
        
        {/* Edit and Delete Buttons at the top */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(index)}
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Update
          </button>
        </div>

        <h4 className="text-xl font-semibold mb-2">{room.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{room.description}</p>

        {/* Room Image */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {room.addedPhotos.map((photo, photoIndex) => (
            <div key={photoIndex} className="col-span-1">
              <img
                src={photo}
                alt={`Room photo ${photoIndex + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Room Amenities */}
        <div className="grid grid-cols-2 gap-4 content-start text-sm mt-6">
          {/* Room Service */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 4h16M4 8h16m-7 4h7" />
            </svg>
            <span>{room.roomService ? 'Room Service Available' : 'No Room Service'}</span>
          </div>

          {/* TV */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M7 8h10m-5-6v12m7-8h2m0 8h-2m2-8v8" />
            </svg>
            <span>{room.TV ? 'Has TV' : 'No TV'}</span>
          </div>

          {/* Balcony */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2l4 8h-8l4-8zm0 8v14m-6 0h12" />
            </svg>
            <span>{room.balcony ? 'Has Balcony' : 'No Balcony'}</span>
          </div>

          {/* Free Wifi */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M2 12a10 10 0 0115.88-6.88M2 12a10 10 0 002.46 6.88M2 12l9-9m-9 9l9 9" />
            </svg>
            <span>{room.freeWifi ? 'Free Wifi' : 'No Wifi'}</span>
          </div>

          {/* City View */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 17l5-5-5-5m14 10l-5-5 5-5" />
            </svg>
            <span>{room.cityView ? 'City View' : 'No City View'}</span>
          </div>

          {/* Ocean View */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 12h14M5 12l7-7m-7 7l7 7m7-7v7" />
            </svg>
            <span>{room.oceanView ? 'Ocean View' : 'No Ocean View'}</span>
          </div>

          {/* Mountain View */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 17l5-5-5-5m14 10l-5-5 5-5" />
            </svg>
            <span>{room.mountainView ? 'Mountain View' : 'No Mountain View'}</span>
          </div>

          {/* Forest View */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2l4 8h-8l4-8zm0 8v14m-6 0h12" />
            </svg>
            <span>{room.forestView ? 'Forest View' : 'No Forest View'}</span>
          </div>

          {/* Air Conditioning */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 3v4M5 17v4m14-4v4M9 7h6m-6 10h6" />
            </svg>
            <span>{room.airCondition ? 'Air Conditioned' : 'No AC'}</span>
          </div>

          {/* Sound Proofing */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 5h8M5 12h14M8 19h8" />
            </svg>
            <span>{room.soundProof ? 'Soundproof' : 'Not Soundproof'}</span>
          </div>

          {/* Room Price */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 3h18v18H3V3z" />
            </svg>
            <span>{room.roomPrice ? `Room Price: $${room.roomPrice}` : 'Room Price Not Available'}</span>
          </div>

          {/* Breakfast Price */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16v4H4V6z" />
            </svg>
            <span>{room.breakfastPrice ? `Breakfast: $${room.breakfastPrice}` : 'No Breakfast Price'}</span>
          </div>

          {/* Bed Count */}
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 6h18v12H3V6z" />
            </svg>
            <span>{room.beds ? `${room.beds} Beds Available` : 'No Beds Available'}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

         



         







        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded mt-4">
          Submit
        </button>
      </form>

      {/* Modal for Room Details */}
{isModalOpen && (
    <Modal
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            setSelectedRoom(null); // Reset selected room on close
        }}
        onSubmit={handleModalSubmit}
        roomData={selectedRoom ? selectedRoom.data : null} // Pass the selected room data
        onDelete={handleDelete} // Pass the delete function
    />
)}


 

    </div>
  );
};

export default ProductForm;
