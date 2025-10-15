import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { courseTitle, documentTitle, fileName, fileContent, fileType } = req.body;

    if (!courseTitle || !documentTitle || !fileName || !fileContent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a unique filename for the course note
    const timestamp = new Date().toISOString();
    const sanitizedCourseTitle = courseTitle.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `course-notes/${sanitizedCourseTitle}/${sanitizedFileName}_${Date.now()}.json`;
    
    // Prepare the course note data to store
    const courseNoteData = {
      courseTitle,
      documentTitle,
      fileName,
      fileType,
      uploadedAt: timestamp,
      id: `course-note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      blobUrl: '', // Will be set after blob creation
      metadata: {
        originalFileName: fileName,
        fileSize: fileContent.length,
        mimeType: fileType
      }
    };

    // Store in Vercel Blob
    const blob = await put(filename, JSON.stringify(courseNoteData, null, 2), {
      access: 'public',
      addRandomSuffix: false
    });

    // Update the blobUrl in the stored data
    courseNoteData.blobUrl = blob.url;

    console.log(`Course note stored: ${filename}`);

    return res.status(200).json({ 
      success: true, 
      courseNoteId: courseNoteData.id,
      blobUrl: blob.url,
      message: 'Course note stored successfully' 
    });

  } catch (error) {
    console.error('Error storing course note:', error);
    return res.status(500).json({ 
      error: 'Failed to store course note',
      details: error.message 
    });
  }
}
