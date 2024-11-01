// app/(users)/account/profile/page.js (or wherever your file is located)

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export default async function ProfilePage() {
  // Fetch the session data on the server side
  const session = await getServerSession(authOptions);

  // Check if session exists
  if (!session) {
    return <p>Please sign in to view this page.</p>;
  }

  // Extract user information from session
  const user = session.user.name || session.user.email;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span>
        Logged in as {user}
      </span>
      <button className="max-w-sm mt-2 primary">
        Logout
      </button>
    </div>
  );
}
