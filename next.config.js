/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.beatsbydre.com', // Existing domain
      'images.pexels.com',   // Allow images from Pexels
      'a0.muscache.com',     // Add Airbnb image source
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https', // Ensure this is HTTPS
        hostname: 'images.pexels.com', // Added Pexels here
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig;
