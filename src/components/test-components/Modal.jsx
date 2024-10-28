'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhotosUploader from '@/components/PhotoUploader';

const roomSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    bedCount: z.string().min(1).transform((val) => Number(val)).refine(val => !isNaN(val), { message: 'Bed count must be a number' }),
    guestCount: z.string().min(1).transform((val) => Number(val)).refine(val => !isNaN(val), { message: 'Guest count must be a number' }),
    bathroomCount: z.string().min(1).transform((val) => Number(val)).refine(val => !isNaN(val), { message: 'Bathroom count must be a number' }),
    kingBed: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
    queenBed: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
    roomPrice: z.string().min(1).transform((val) => Number(val)).refine(val => !isNaN(val), { message: 'Room price must be a number' }),
    breakfastPrice: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
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
    addedPhotos: z.array(z.string()).optional(),
});

export default function Modal({ onSubmit, onClose, roomData, onDelete }) {
    const [addedPhotos, setAddedPhotos] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(roomSchema),
    });

    // Fill form with existing room data when roomData changes
    useEffect(() => {
        if (roomData) {
            reset({ 
                ...roomData,
                bedCount: roomData.bedCount.toString(),
                guestCount: roomData.guestCount.toString(),
                bathroomCount: roomData.bathroomCount.toString(),
                roomPrice: roomData.roomPrice.toString(),
                breakfastPrice: roomData.breakfastPrice ? roomData.breakfastPrice.toString() : '',
                kingBed: roomData.kingBed ? roomData.kingBed.toString() : '',
                queenBed: roomData.queenBed ? roomData.queenBed.toString() : '',
            });
            setAddedPhotos(roomData.addedPhotos || []);
        }
    }, [roomData, reset]);

    const handleFormSubmit = (data) => {
        console.log("Form submitted");
        const newRoom = {
            ...data,
            addedPhotos: addedPhotos,
        };

        localStorage.setItem('roomData', JSON.stringify(newRoom));
        console.log("New Room---->", newRoom);
        onSubmit(newRoom); // Send modal data back to parent
        reset(); // Reset modal form
    };

    const handleDelete = () => {
        if (onDelete && roomData) {
            onDelete(roomData); // Call delete function from parent
            onClose(); // Close the modal after deletion
        }
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="modal-content bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    {/* Modal Header with Close Button */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold mb-4">Add a Room</h2>
                        <button type="button" onClick={onClose} className="text-gray-500 hover:text-black focus:outline-none">
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
                            {['roomService', 'TV', 'balcony', 'freeWifi', 'cityView', 'oceanView', 'mountainView', 'forestView', 'airCondition', 'soundProof'].map((amenity) => (
                                <label key={amenity}>
                                    <input {...register(amenity)} type="checkbox" /> {amenity.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + amenity.slice(1)}
                                </label>
                            ))}
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
                            className="w-full border p-2 rounded"
                        />
                        {errors.bathroomCount && <p className="text-red-500 text-sm">{errors.bathroomCount.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
