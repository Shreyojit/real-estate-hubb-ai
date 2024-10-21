import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const GET = (async (req) => {
  // Your logic for GET request, if needed
});

export const POST = (async (req) => {
  const { link } = req.body;
  try {
    const response = await cloudinary.v2.uploader.upload(link);
    return Response.json(response.secure_url);
  } catch (error) {
    console.error("Error uploading photo by link:", error);
    return Response.json({ error: 'Error uploading photo' }, { status: 500 });
  }
});
