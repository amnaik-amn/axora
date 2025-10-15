import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userType = 'student', loginMethod = 'demo' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Create a unique filename for the login record
    const timestamp = new Date().toISOString();
    const filename = `logins/${userType}/${email.replace('@', '_at_')}_${Date.now()}.json`;
    
    // Prepare the login data to store
    const loginData = {
      email,
      userType,
      loginMethod,
      loginTimestamp: timestamp,
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Store in Vercel Blob
    const blob = await put(filename, JSON.stringify(loginData, null, 2), {
      access: 'public',
      addRandomSuffix: false
    });

    console.log(`Login data stored: ${filename}`);

    return res.status(200).json({ 
      success: true, 
      sessionId: loginData.sessionId,
      blobUrl: blob.url,
      message: 'Login data stored successfully' 
    });

  } catch (error) {
    console.error('Error storing login data:', error);
    return res.status(500).json({ 
      error: 'Failed to store login data',
      details: error.message 
    });
  }
}
