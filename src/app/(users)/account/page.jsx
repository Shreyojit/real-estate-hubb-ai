'use client'; // Make sure this is the first line

import UserForm from '@/components/UserForm';
import UserTabs from '@/components/UserTabs';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    const user = session?.user || {}; // Safely default user

    useEffect(() => {
        if (status === "authenticated") {
            const isAdminUser = user.email === 'admin@example.com'; // Example admin check
            setIsAdmin(isAdminUser);
        }
    }, [status, user.email]);

    const handleProfileInfoUpdate = async (ev, profileData) => {
        ev.preventDefault();
        // Your API logic to update the profile here
    };

    if (status === "loading") {
        return <p>Loading...</p>; // You can handle loading state
    }

    if (status === "unauthenticated") {
        return <p>Please sign in to access this page.</p>; // Handle unauthenticated state
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <UserForm onSubmit={handleProfileInfoUpdate} />
            {/* Add additional UI elements as needed */}
        </div>
    );
}
