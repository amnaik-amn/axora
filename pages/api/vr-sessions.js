// API endpoint for storing VR sessions
import { put, head, list } from '@vercel/blob';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Get all VR sessions
        const sessions = await getVRSessions();
        return res.status(200).json(sessions);

      case 'POST':
        // Create new VR session
        const newSession = await createVRSession(req.body);
        return res.status(201).json(newSession);

      case 'PUT':
        // Update existing VR session
        const updatedSession = await updateVRSession(req.body);
        return res.status(200).json(updatedSession);

      case 'DELETE':
        // Delete VR session
        const { sessionId } = req.query;
        await deleteVRSession(sessionId);
        return res.status(200).json({ success: true });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('VR Sessions API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all VR sessions from blob storage
async function getVRSessions() {
  try {
    const blob = await head('vr-sessions.json');
    if (blob) {
      const response = await fetch(blob.url);
      const sessions = await response.json();
      return sessions;
    }
    return [];
  } catch (error) {
    console.error('Error fetching VR sessions:', error);
    return [];
  }
}

// Create new VR session
async function createVRSession(sessionData) {
  try {
    const existingSessions = await getVRSessions();
    const newSession = {
      id: generateSessionId(),
      ...sessionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedSessions = [...existingSessions, newSession];
    await saveVRSessions(updatedSessions);
    
    return newSession;
  } catch (error) {
    console.error('Error creating VR session:', error);
    throw error;
  }
}

// Update existing VR session
async function updateVRSession(sessionData) {
  try {
    const existingSessions = await getVRSessions();
    const sessionIndex = existingSessions.findIndex(session => session.id === sessionData.id);
    
    if (sessionIndex === -1) {
      throw new Error('Session not found');
    }
    
    existingSessions[sessionIndex] = {
      ...existingSessions[sessionIndex],
      ...sessionData,
      updatedAt: new Date().toISOString()
    };
    
    await saveVRSessions(existingSessions);
    return existingSessions[sessionIndex];
  } catch (error) {
    console.error('Error updating VR session:', error);
    throw error;
  }
}

// Delete VR session
async function deleteVRSession(sessionId) {
  try {
    const existingSessions = await getVRSessions();
    const updatedSessions = existingSessions.filter(session => session.id !== sessionId);
    await saveVRSessions(updatedSessions);
  } catch (error) {
    console.error('Error deleting VR session:', error);
    throw error;
  }
}

// Save sessions to blob storage
async function saveVRSessions(sessions) {
  const sessionsJson = JSON.stringify(sessions, null, 2);
  await put('vr-sessions.json', sessionsJson, {
    access: 'public',
    contentType: 'application/json'
  });
}

// Generate unique session ID
function generateSessionId() {
  return 'vr_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
