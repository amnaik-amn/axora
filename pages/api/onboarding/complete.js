import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, email, userType, onboardingData } = req.body;

    if (!userId || !email || !onboardingData) {
      return res.status(400).json({ error: 'User ID, email, and onboarding data are required' });
    }

    // Create a unique filename for the onboarding completion record
    const timestamp = new Date().toISOString();
    const filename = `onboarding/${userType}/${email.replace('@', '_at_')}_onboarding_${Date.now()}.json`;
    
    // Prepare the onboarding completion data to store
    const dataToStore = {
      userId,
      email,
      userType,
      onboardingData,
      completedAt: timestamp,
      onboardingId: `onboarding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Store in Vercel Blob
    const blob = await put(filename, JSON.stringify(dataToStore, null, 2), {
      access: 'public',
      addRandomSuffix: false
    });

    console.log(`Onboarding completion data stored: ${filename}`);

    return res.status(200).json({ 
      success: true, 
      onboardingId: dataToStore.onboardingId,
      blobUrl: blob.url,
      message: 'Onboarding completion data stored successfully' 
    });

  } catch (error) {
    console.error('Error storing onboarding completion data:', error);
    return res.status(500).json({ 
      error: 'Failed to store onboarding completion data',
      details: error.message 
    });
  }
}
