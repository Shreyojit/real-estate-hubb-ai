'use client'; // Ensure this is a client component

import Header from "@/components/Header";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession(); // Fetch the session

  useEffect(() => {
    setIsMounted(true); // Set to true after component has mounted
  }, []);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          <div className="flex flex-col max-w-4xl min-h-screen px-8 py-4 mx-auto">
            <Header />
            <main className="flex-1"> 
              {isMounted ? children : null} {/* Render children only after the component has mounted */}
            </main>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
