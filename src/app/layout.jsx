'use client'

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "react-hot-toast";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <SessionProvider>
          <div className="flex flex-col max-w-4xl min-h-screen px-8 py-4 mx-auto">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
