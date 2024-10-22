import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhotosUploader from '@/components/PhotoUploader';

const roomSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  bedCount: z.number().min(1, { message: 'At least 1 bed is required' }),
  guestCount: z.number().min(1, { message: 'At least 1 guest is required' }),
  bathroomCount: z.number().min(0, { message: 'Must specify the number of bathrooms' }),
  kingBed: z.number().optional(),
  queenBed: z.number().optional(),
  roomPrice: z.number().min(1, { message: 'Price must be at least 1' }),
  breakfastPrice: z.number().optional(),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProof: z.boolean().optional(),
  addedPhotos: z.array(z.string()).min(1, { message: 'At least one photo is required' }),
});

export default function RoomForm({ onSubmit, closeModal }) {

 const [addedPhotos, setAddedPhotos] = useState([]); // State for added photos


  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      title: '',
      description: '',
      bedCount: 1,
      guestCount: 1,
      bathroomCount: 1,
      roomPrice: 100,
      addedPhotos: [],
    },
  });

  // Modify the onSubmit to log form data
  const handleFormSubmit = (data) => {
    console.log("Form Data: ", data); // Log form data to the console
    onSubmit(data); // Proceed with the original submission logic
    closeModal();
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="modal-content bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Modal Header with Close Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Add a Room</h2>
            <button type="button" onClick={closeModal} className="text-gray-500 hover:text-black focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Room Title */}
          <div>
            <label htmlFor="title" className="block font-medium">Room Title</label>
            <input
              {...register('title')}
              type="text"
              placeholder="Room Title"
              className="w-full border p-2 rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Room Description */}
          <div>
            <label htmlFor="description" className="block font-medium">Room Description</label>
            <textarea
              {...register('description')}
              placeholder="Room Description"
              className="w-full border p-2 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Room Amenities - Checkboxes */}
          <div>
            <label className="block font-medium">Room Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              <label>
                <input {...register('roomService')} type="checkbox" /> Room Service
              </label>
              <label>
                <input {...register('TV')} type="checkbox" /> TV
              </label>
              <label>
                <input {...register('balcony')} type="checkbox" /> Balcony
              </label>
              <label>
                <input {...register('freeWifi')} type="checkbox" /> Free Wifi
              </label>
              <label>
                <input {...register('cityView')} type="checkbox" /> City View
              </label>
              <label>
                <input {...register('oceanView')} type="checkbox" /> Ocean View
              </label>
              <label>
                <input {...register('mountainView')} type="checkbox" /> Mountain View
              </label>
              <label>
                <input {...register('forestView')} type="checkbox" /> Forest View
              </label>
              <label>
                <input {...register('airCondition')} type="checkbox" /> Air Conditioning
              </label>
              <label>
                <input {...register('soundProof')} type="checkbox" /> Sound Proofing
              </label>
            </div>
          </div>

          {/* Photos Uploader */}
          
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {errors.addedPhotos && <p className="text-red-500">{errors.addedPhotos.message}</p>}

          {/* Room Price and Breakfast Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="roomPrice" className="block font-medium">Room Price</label>
              <input
                {...register('roomPrice')}
                type="number"
                placeholder="Room Price"
                className="w-full border p-2 rounded"
              />
              {errors.roomPrice && <p className="text-red-500 text-sm">{errors.roomPrice.message}</p>}
            </div>
            <div>
              <label htmlFor="breakfastPrice" className="block font-medium">Breakfast Price</label>
              <input
                {...register('breakfastPrice')}
                type="number"
                placeholder="Breakfast Price"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Bed Count and King Bed */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedCount" className="block font-medium">Bed Count</label>
              <input
                {...register('bedCount')}
                type="number"
                placeholder="Bed Count"
                className="w-full border p-2 rounded"
              />
              {errors.bedCount && <p className="text-red-500 text-sm">{errors.bedCount.message}</p>}
            </div>
            <div>
              <label htmlFor="kingBed" className="block font-medium">King Bed</label>
              <input
                {...register('kingBed')}
                type="number"
                placeholder="King Bed"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Guest Count and Queen Bed */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="guestCount" className="block font-medium">Guest Count</label>
              <input
                {...register('guestCount')}
                type="number"
                placeholder="Guest Count"
                className="w-full border p-2 rounded"
              />
              {errors.guestCount && <p className="text-red-500 text-sm">{errors.guestCount.message}</p>}
            </div>
            <div>
              <label htmlFor="queenBed" className="block font-medium">Queen Bed</label>
              <input
                {...register('queenBed')}
                type="number"
                placeholder="Queen Bed"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Bathroom Count */}
          <div>
            <label htmlFor="bathroomCount" className="block font-medium">Bathroom Count</label>
            <input
              {...register('bathroomCount')}
              type="number"
              placeholder="Bathroom Count"
              className="w-1/2 border p-2 rounded"
            />
            {errors.bathroomCount && <p className="text-red-500 text-sm">{errors.bathroomCount.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
