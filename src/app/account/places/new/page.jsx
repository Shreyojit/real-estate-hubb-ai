'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import Perks from '@/components/Perks';
import PhotosUploader from '@/components/PhotoUploader';
import RoomForm from '@/components/RoomForm';

const placeSchema = z.object({
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
});

export default function NewPlace() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [fileNames, setFileNames] = useState('');
    const [perks, setPerks] = useState([]);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [addedRooms, setAddedRooms] = useState([]);

    const handleRoomSubmit = (roomData) => {
        setAddedRooms((prev) => [...prev, roomData]);
        setModalOpen(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(placeSchema),
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
        },
    });

    const onSubmit = async (data) => {
        console.log("Form submitted");
        console.log("Submitted data:", {
            ...data,
            addedPhotos: addedPhotos,
            perks: perks,
        });
        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            router.push("/account/places");
        }
    }, [redirect, router]);

    const preInput = (header, description) => (
        <>
            <h2 className="text-2xl mt-4">{header}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
        </>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
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
                    <h3 className="mt-2 -mb-1">Check in time</h3>
                    <input
                        {...register("checkIn")}
                        type="text"
                        placeholder="14"
                        className={`w-full p-2 border rounded ${errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.checkIn && <p className="text-red-500">{errors.checkIn.message}</p>}
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check out time</h3>
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
                onClick={() => setModalOpen(true)}
                className="bg-gray-200 px-4 h-10 mt-4 rounded-2xl"
            >
                Add Rooms
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <RoomForm onSubmit={handleRoomSubmit} />
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-2 bg-gray-500 text-white p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h3 className="text-xl">Added Rooms:</h3>
                {addedRooms.length > 0 ? (
                    addedRooms.map((room, index) => (
                        <div key={index} className="border p-2 mt-2">
                            <h4 className="text-lg font-bold">{room.title}</h4>
                            <p>{room.description}</p>
                            <p>Beds: {room.bedCount}, Guests: {room.guestCount}</p>
                            <p>Price: ${room.roomPrice}</p>
                        </div>
                    ))
                ) : (
                    <p>No rooms added yet.</p>
                )}
            </div>

            <button type="submit" className="mt-4 bg-red-500 w-full text-white p-2 rounded">Submit</button>
        </form>
    );
}
