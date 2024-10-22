'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

export default function TestForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Form submitted successfully:", data); // Should log the submitted data
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title", { required: true })} placeholder="Title" />
            {errors.title && <p>This field is required</p>}
            
            <button type="submit">Submit</button>
        </form>
    );
}
