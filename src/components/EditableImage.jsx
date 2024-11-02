'use client'

import axios from 'axios';
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from 'react';

export default function EditableImage({ link, setLink }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const file = files[0];
      const data = new FormData();
      data.set('file', file);

      // Fetch signature and timestamp from your backend
      const resSign = await fetch('/api/cloudinary-sign', { method: 'POST' });
      const { signature, timestamp } = await resSign.json();

      // Append additional required fields for Cloudinary upload
      data.append('signature', signature);
      data.append('timestamp', timestamp);
      data.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const uploadPromise = axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        if (response.status === 200) {
          setLink(response.data.secure_url); // Use secure_url for the image link
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload error',
      });
    }
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border bg-gray-400 border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}
