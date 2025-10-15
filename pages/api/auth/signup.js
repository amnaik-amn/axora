import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData, userType = 'student' } = req.body;

    if (!userData || !userData.email) {
      return res.status(400).json({ error: 'User data and email are required' });
    }

    // Create a unique filename for the user data
    const timestamp = new Date().toISOString();
    const filename = `${userType}/${userData.email.replace('@', '_at_')}_${Date.now()}.json`;
    
    // Prepare the data to store
    const dataToStore = {
      ...userData,
      userType,
      signupTimestamp: timestamp,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Store in Vercel Blob
    const blob = await put(filename, JSON.stringify(dataToStore, null, 2), {
      access: 'public',
      addRandomSuffix: false
    });

    console.log(`User signup data stored: ${filename}`);

    return res.status(200).json({ 
      success: true, 
      userId: dataToStore.id,
      blobUrl: blob.url,
      message: 'User data stored successfully' 
    });

  } catch (error) {
    console.error('Error storing user signup data:', error);
    return res.status(500).json({ 
      error: 'Failed to store user data',
      details: error.message 
    });
  }
}
