import multiparty from "multiparty";
import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the incoming form data
    const { fields, files } = await new Promise((resolve, reject) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const links = [];

    // Upload each file to Cloudinary
    for (const file of files.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "admin-dashboard",
          public_id: `file_${Date.now()}`,
          resource_type: "auto", // Automatically determine file type
        });
        links.push(result.secure_url); // Save the secure URL
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ error: "File upload failed" });
      }
    }

    // Return the uploaded file URLs
    return res.status(200).json({ links });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// Disable body parser to handle file uploads
export const config = {
  api: { bodyParser: false },
};
