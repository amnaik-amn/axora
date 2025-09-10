// API route for handling file uploads to Vercel Blob
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = file.name || 'assignment';
    const extension = originalName.split('.').pop() || 'txt';
    const fileName = `assignments/${timestamp}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      fileName: originalName,
      blobName: fileName,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed', 
      message: error.message 
    });
  }
}

// Configure the API route
export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
};
