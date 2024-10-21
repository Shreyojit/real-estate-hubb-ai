// Import the Cloudinary library
import cloudinary from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Export the POST handler for the API route
export const POST = async (req) => {
    // Get the current timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate the signature for the upload request
    const signature = cloudinary.v2.utils.api_sign_request(
        { timestamp: timestamp },
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    );

    // Return the signature and timestamp in the response
    return new Response(JSON.stringify({ signature, timestamp }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
