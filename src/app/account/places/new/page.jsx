'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import Perks from '@/components/Perks';
import PhotosUploader from '@/components/PhotoUploader';

const placeSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    checkIn: z.string().min(1, { message: "Check-in time is required" }),
    checkOut: z.string().min(1, { message: "Check-out time is required" }),
    maxGuests: z.number().min(1, { message: "At least one guest is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    addedPhotos: z.array(z.string()).min(1, { message: "At least one photo is required" }),
    perks: z.array(z.string()).optional(),
    extraInfo: z.string().optional(),
});

export default function NewPlace() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [fileNames, setFileNames] = useState(''); // State to hold selected file names
    const [perks, setPerks] = useState([]); // State for selected perks
    const [addedPhotos, setAddedPhotos] = useState([]); // State for added photos

    const {
        register,
        handleSubmit,
        setValue,
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
        try {
            await fetch('/api/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setRedirect(true);
        } catch (error) {
            console.error("Error saving place:", error);
        }
    };

    useEffect(() => {
        if (redirect) {
            router.push("/account/places");
        }
    }, [redirect, router]);

    function preInput(header, description) {
        return (
            <>
                <h2 className="text-2xl mt-4">{header}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        );
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const fileNamesArray = files.map(file => file.name); // Get file names
        
        setFileNames(fileNamesArray.join(', ')); // Join names with commas
        setAddedPhotos(files.map(file => URL.createObjectURL(file))); // Store file URLs for preview
        setValue("addedPhotos", files.map(file => URL.createObjectURL(file))); // Store file URLs for form submission
        console.log(fileNamesArray);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
            <input
                {...register("title")}
                type="text"
                placeholder="e.g., My lovely apartment"
                className={`input w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            
            {preInput('Address', 'Address to this place')}
            <input
                {...register("address")}
                type="text"
                placeholder="Address"
                className={`input w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}

            {preInput('Photos', 'More = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {errors.addedPhotos && <p className="text-red-500">{errors.addedPhotos.message}</p>}
            
            {/* Display the selected file names */}
            {fileNames && (
                <p className="mt-2 text-gray-700">Selected files: {fileNames}</p>
            )}

            {preInput('Description', 'Description of the place')}
            <textarea
                {...register("description")}
                placeholder="Description of your place"
                className={`textarea w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            {preInput('Perks', 'Select all the perks of your place')}
            <Perks selected={perks} onChange={setPerks} />
           
            <button type="submit" className="mt-4 bg-red-500 w-full text-white p-2 rounded">Submit</button>
        </form>
    );
}
