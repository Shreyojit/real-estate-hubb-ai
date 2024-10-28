'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod schema for modal form
const modalSchema = z.object({
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string(),
  isAvailable: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

const RoomForm = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(modalSchema), // Use zodResolver with modalSchema
  });

  const handleFormSubmit = (data) => {
    onSubmit(data); // Send modal data back to parent
    reset(); // Reset modal form
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-5 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Additional Details</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Enter description"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              {...register('imageUrl')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Enter image URL"
            />
            {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('isAvailable')}
                type="checkbox"
                className="mr-2"
              />
              Is Available?
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('isFeatured')}
                type="checkbox"
                className="mr-2"
              />
              Is Featured?
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
