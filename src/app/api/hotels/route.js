import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Define the handler for the POST method
export async function POST(request) {
  // Fetch the session to ensure user is authenticated
  const session = await getServerSession(authOptions);
console.log("session is--->",session)
  // Check for an active session to ensure the user is authenticated
  if (!session || !session.user) {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Assuming user ID is available in the session

  let data;
  try {
    data = await request.json(); // Parse the JSON data from the request
    console.log("Parsed data:", data);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // Destructure required fields from the parsed data
  const { title, description, images, country, state, city, locationDescription, rooms } = data;

  // Validate required fields
  if (!title || !description || !rooms || !Array.isArray(rooms)) {
    console.log("Missing required fields:", data);
    return NextResponse.json({ message: "Hotel title, description, and rooms are required" }, { status: 400 });
  }

  try {
    // Create a new hotel with associated rooms and user ID
    const hotel = await prisma.hotel.create({
      data: {
        userId, // Associate the hotel with the logged-in user
        title,
        description,
        images,
        country,
        state,
        city,
        locationDescription,
        rooms: {
          create: rooms, // Create rooms associated with this hotel
        },
      },
      include: {
        rooms: true, // Include created rooms in the response
      },
    });

    console.log("Hotel created successfully:", hotel);
    return NextResponse.json(hotel, { status: 201 }); // Return the created hotel with a success status
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json({ message: "Failed to create hotel" }, { status: 500 });
  }
}
