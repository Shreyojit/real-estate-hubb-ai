import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({}), { status: 404 });
  }

  const userEmail = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { UserInfo: true },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("User not found", { status: 404 });
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return new Response("User not found", { status: 404 });
  }

  const data = await req.json();
  const { name, image, ...otherUserInfo } = data;

  try {
    // Update user information
    await prisma.user.update({
      where: { email: userEmail },
      data: { name, image },
    });

    // Upsert user info
    await prisma.userInfo.upsert({
      where: { email: userEmail },
      update: otherUserInfo,
      create: {
        email: userEmail,
        ...otherUserInfo,
      },
    });

    return new Response(JSON.stringify(true), { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return new Response("Profile update failed", { status: 500 });
  }
}
