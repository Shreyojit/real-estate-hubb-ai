import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const password = body.password;

  // Validate password length
  if (!password || password.length < 5) {
    return new Response("Password must be at least 5 characters long.", { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in the database
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        image: body.image,
      },
    });
    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("User creation failed", { status: 500 });
  }
}
