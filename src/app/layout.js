import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col max-w-4xl min-h-screen px-8 py-4 mx-auto">
          <Header />  {/* Ensure Header is imported and used */}
          {children}  {/* Place children inside the layout's div */}
        </div>
      </body>
    </html>
  );
}
