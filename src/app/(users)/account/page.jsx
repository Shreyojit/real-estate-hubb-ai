'use client'; // Make sure this is the first line

import UserForm from '@/components/UserForm';
import UserTabs from '@/components/UserTabs';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    
    const [isAdmin, setIsAdmin] = useState(false);
    const user = session?.user || {}; // Safely default user



   const handleProfileInfoUpdate = async (ev, profileData) => {
        ev.preventDefault();

        console.log("handleProfileInfoUpdate called"); // Debugging line
        console.log("Profile Data:", profileData); // Debugging line

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
            if (response.ok) resolve();
            else reject();
        });

        await toast.promise(savingPromise, {
            pending: 'Saving...',
            success: 'Profile saved!',
            error: 'Error saving profile.',
        });
    };

    if (status === "loading") {
        return <p>Loading...</p>; // Handle loading state
    }

    if (status === "unauthenticated") {
        return <p>Please sign in to access this page.</p>; // Handle unauthenticated state
    }

    return (
        <div>
            <h1 className="text-center">Profile Page</h1>
            <UserForm user={user} onSave={handleProfileInfoUpdate} isAdmin={isAdmin} />
            {/* Add additional UI elements as needed */}
        </div>
    );
}
