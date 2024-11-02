"use client";

import React, { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";


export default function ProfilePage({ initialUser }) {
  const [user, setUser] = useState(initialUser);

  // Handle profile info update
  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  if (!user) {
    return <p>Please sign in to view this page.</p>;
  }

  return (
    <div>
      <UserForm user={user} onSave={handleProfileInfoUpdate} />
    </div>
  );
}
