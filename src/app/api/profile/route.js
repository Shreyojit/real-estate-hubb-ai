import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the handler for the PUT method
export async function PUT(req) {
    console.log("Received a PUT request");

    const session = await getServerSession(req);
    console.log("Session data:", session);
    
    if (!session || !session.user) {
        console.log("Unauthorized access attempt");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    let data;
    try {
        data = await req.json();
        console.log("Parsed data:", data);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    // Check for required fields, excluding email
    if (!data.name || !data.streetAddress) {
        console.log("Missing required profile fields:", data);
        return NextResponse.json({ message: "Profile data is required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found for email:", userEmail);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update the user data
        await prisma.user.update({
            where: { email: userEmail },
            data: { 
                name: data.name, 
                image: data.image || null // Set to null if no image is provided
            },
        });
        console.log("User updated successfully");

        // Upsert the userInfo data, using session email for updates
        await prisma.userInfo.upsert({
            where: { userId: user.id },
            update: {
                streetAddress: data.streetAddress,
                postalCode: data.postalCode,
                city: data.city,
                country: data.country,
                phone: data.phone,
                admin: data.admin,
                email: userEmail, // use session email for update
            },
            create: {
                userId: user.id,
                streetAddress: data.streetAddress,
                postalCode: data.postalCode,
                city: data.city,
                country: data.country,
                phone: data.phone,
                admin: data.admin,
                email: data.email || userEmail, // use data.email if provided, otherwise userEmail
            },
        });
        console.log("UserInfo upserted successfully");

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Profile update failed" }, { status: 500 });
    }
}
