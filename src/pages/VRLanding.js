import React, { useState, useEffect } from 'react';
import { Glasses, Home, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local storage functions for VR sessions (since this is a React app, not Next.js)
const VRSessionsAPI = {
  getSessions() {
    try {
      const sessions = localStorage.getItem('vr-sessions');
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error fetching VR sessions:', error);
      return [];
    }
  },

  createSession(sessionData) {
    try {
      const sessions = this.getSessions();
      const newSession = {
        id: generateSessionId(),
        ...sessionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedSessions = [...sessions, newSession];
      localStorage.setItem('vr-sessions', JSON.stringify(updatedSessions));
      return newSession;
    } catch (error) {
      console.error('Error creating VR session:', error);
      throw error;
    }
  },

  updateSession(sessionData) {
    try {
      const sessions = this.getSessions();
      const sessionIndex = sessions.findIndex(session => session.id === sessionData.id);
      
      if (sessionIndex === -1) {
        throw new Error('Session not found');
      }
      
      sessions[sessionIndex] = {
        ...sessions[sessionIndex],
        ...sessionData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('vr-sessions', JSON.stringify(sessions));
      return sessions[sessionIndex];
    } catch (error) {
      console.error('Error updating VR session:', error);
      throw error;
    }
  },

  deleteSession(sessionId) {
    try {
      const sessions = this.getSessions();
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      localStorage.setItem('vr-sessions', JSON.stringify(updatedSessions));
    } catch (error) {
      console.error('Error deleting VR session:', error);
      throw error;
    }
  }
};

// Generate unique session ID
function generateSessionId() {
  return 'vr_session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

const VRLanding = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4');
  const [downloadFilename, setDownloadFilename] = useState('VR_Walkthrough_Universal.mp4');
  const [videoSource, setVideoSource] = useState('https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4');
  const [vrSessions, setVrSessions] = useState([]);

  // Function to sort sessions by time
  const sortSessionsByTime = () => {
    const upcomingSessions = document.querySelector('.space-y-4');
    if (!upcomingSessions) return;
    
    const sessions = Array.from(upcomingSessions.children);
    sessions.sort((a, b) => {
      const aTime = a.getAttribute('data-time') || '';
      const bTime = b.getAttribute('data-time') || '';
      
      // Simple time comparison (you can enhance this)
      return aTime.localeCompare(bTime);
    });
    
    // Reorder the DOM elements
    sessions.forEach(session => upcomingSessions.appendChild(session));
  };

  // Load VR sessions from localStorage
  const loadVRSessions = () => {
    try {
      const sessions = VRSessionsAPI.getSessions();
      setVrSessions(sessions);
      console.log('📅 Loaded VR sessions:', sessions.length);
      
      // Render sessions in the UI
      if (sessions.length > 0) {
        renderSessionsFromAPI(sessions);
      }
    } catch (error) {
      console.error('Failed to load VR sessions:', error);
    }
  };

  // Render sessions from API data
  const renderSessionsFromAPI = (sessions) => {
    const upcomingSessions = document.querySelector('.space-y-4');
    if (!upcomingSessions) return;

    // Clear existing sessions (keep the default ones if any)
    const existingSessions = upcomingSessions.querySelectorAll('li[data-session-id]');
    existingSessions.forEach(session => session.remove());

    // Add sessions from API
    sessions.forEach(session => {
      const sessionElement = document.createElement('li');
      sessionElement.className = 'flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer';
      sessionElement.innerHTML = `<span class="font-medium text-white">${session.title}</span><span class="text-gray-300">${session.date} ${session.time}</span>`;
      
      // Store session data as attributes
      sessionElement.setAttribute('data-session-id', session.id);
      sessionElement.setAttribute('data-title', session.title);
      sessionElement.setAttribute('data-date', session.date);
      sessionElement.setAttribute('data-time', session.time);
      sessionElement.setAttribute('data-duration', session.duration);
      sessionElement.setAttribute('data-type', session.sessionType);
      sessionElement.setAttribute('data-participants', session.participants);
      sessionElement.setAttribute('data-description', session.description);
      sessionElement.setAttribute('data-is-personal', session.isPersonal);

      // Add click handler
      sessionElement.addEventListener('click', () => {
        showSessionDetailsModal(sessionElement, session);
      });

      // Insert at the beginning
      upcomingSessions.insertBefore(sessionElement, upcomingSessions.firstChild);
    });

    // Sort sessions by time
    sortSessionsByTime();
  };

  // Show session details modal
  const showSessionDetailsModal = (sessionElement, session) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md w-full shadow-2xl relative">
        <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        ${session.isPersonal ? `
          <button id="edit-session-btn" class="absolute top-4 right-12 text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
        ` : ''}
        <h3 class="text-white text-lg font-semibold mb-4">${session.title}</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Date & Time:</span>
            <span class="text-white">${session.date} ${session.time}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Duration:</span>
            <span class="text-white">${session.duration} minutes</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Type:</span>
            <span class="text-white">${session.sessionType}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Participants:</span>
            <span class="text-white">${session.participants}</span>
          </div>
        </div>
        <div class="mt-4 p-3 bg-gray-700/50 rounded-lg">
          <h4 class="text-white font-medium mb-2">Description</h4>
          <p class="text-gray-300 text-sm">${session.description}</p>
        </div>
        <div class="mt-4 flex gap-3">
          <button class="flex-1 px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Join Session</button>
          <button class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel Session</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
    
    if (session.isPersonal) {
      modal.querySelector('#edit-session-btn').addEventListener('click', () => {
        modal.remove();
        showEditSessionModal(sessionElement, session);
      });
    }
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  };

  // Show edit session modal
  const showEditSessionModal = (sessionElement, session) => {
    const editModal = document.createElement('div');
    editModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    editModal.innerHTML = `
      <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <h3 class="text-white text-xl font-semibold mb-6">Edit Session</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Session Title</label>
            <input type="text" id="edit-title" value="${session.title}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Time</label>
            <input type="time" id="edit-time" value="${session.time.replace(' AM', '').replace(' PM', '')}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Duration (minutes)</label>
            <input type="number" id="edit-duration" value="${session.duration}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Session Type</label>
            <select id="edit-type" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
              <option value="Studio Critique" ${session.sessionType === 'Studio Critique' ? 'selected' : ''}>Studio Critique</option>
              <option value="Architecture Walkthrough" ${session.sessionType === 'Architecture Walkthrough' ? 'selected' : ''}>Architecture Walkthrough</option>
              <option value="Urban Sandbox" ${session.sessionType === 'Urban Sandbox' ? 'selected' : ''}>Urban Sandbox</option>
            </select>
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Participants</label>
            <input type="text" id="edit-participants" value="${session.participants}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-gray-300 text-sm font-medium mb-2">Description</label>
            <textarea id="edit-description" rows="3" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">${session.description}</textarea>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end gap-3">
          <button id="cancel-edit" class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel</button>
          <button id="save-edit" class="px-6 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Save Changes</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(editModal);
    
    // Add event listeners
    editModal.querySelector('#cancel-edit').addEventListener('click', () => editModal.remove());
    editModal.querySelector('#save-edit').addEventListener('click', () => {
      try {
        // Get updated session data
        const title = editModal.querySelector('#edit-title').value;
        const time = editModal.querySelector('#edit-time').value;
        const duration = editModal.querySelector('#edit-duration').value;
        const type = editModal.querySelector('#edit-type').value;
        const participants = editModal.querySelector('#edit-participants').value;
        const description = editModal.querySelector('#edit-description').value;
        
        // Prepare updated session data
        const updatedSessionData = {
          id: session.id,
          title: title,
          date: session.date,
          time: time,
          duration: duration,
          sessionType: type,
          participants: participants,
          description: description,
          isPersonal: true
        };
        
        // Update session in localStorage
        const savedSession = VRSessionsAPI.updateSession(updatedSessionData);
        console.log('✅ Session updated in localStorage:', savedSession);
        
        // Update local state
        setVrSessions(prev => prev.map(s => s.id === session.id ? savedSession : s));
        
        // Update the session display
        sessionElement.innerHTML = `<span class="font-medium text-white">${title}</span><span class="text-gray-300">${session.date} ${time}</span>`;
        
        // Update data attributes
        sessionElement.setAttribute('data-title', title);
        sessionElement.setAttribute('data-time', time);
        sessionElement.setAttribute('data-duration', duration);
        sessionElement.setAttribute('data-type', type);
        sessionElement.setAttribute('data-participants', participants);
        sessionElement.setAttribute('data-description', description);
        
        editModal.remove();
        
        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
        toast.innerHTML = '✓ Session updated successfully';
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.transform = 'translateY(100px)';
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      } catch (error) {
        console.error('Failed to update session:', error);
        
        // Show error toast
        const errorToast = document.createElement('div');
        errorToast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
        errorToast.innerHTML = '❌ Failed to update session. Please try again.';
        document.body.appendChild(errorToast);
        setTimeout(() => {
          errorToast.style.transform = 'translateY(100px)';
          errorToast.style.opacity = '0';
          setTimeout(() => errorToast.remove(), 300);
        }, 3000);
      }
    });
    
    editModal.addEventListener('click', (e) => {
      if (e.target === editModal) editModal.remove();
    });
  };

  useEffect(() => {
    // Set the video source to the Vercel Blob video
    setVideoSource('https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4');
    setDownloadUrl('https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4');
    setDownloadFilename('VR_Walkthrough_Universal.mp4');
    
    // Load VR sessions from API
    loadVRSessions();
    
    console.log('☁️ Video source: VR_Walkthrough_Universal.mp4 (Vercel Blob)');
    console.log('📥 Download URL:', downloadUrl);
    console.log('📁 Download filename:', downloadFilename);
  }, [downloadUrl]);

  const handleLaunchVR = (mode) => {
    console.log('🎬 Launching VR Walkthrough:', mode);
    setShowVideo(true);
    
    // Scroll to the VR preview area
    const vrPreviewElement = document.querySelector('.vr-preview-area');
    if (vrPreviewElement) {
      vrPreviewElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Start the optimized VR walkthrough video
    setTimeout(() => {
      const videoElement = document.querySelector('.vr-demo-video');
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play().then(() => {
          console.log('✅ VR Walkthrough playing successfully');
        }).catch(e => {
          console.log('⚠️ Autoplay prevented - user can click play:', e);
        });
      }
    }, 500);
  };

  const handleToggleVideo = () => {
    const newShowVideo = !showVideo;
    setShowVideo(newShowVideo);
    
    // If hiding video, pause it
    if (!newShowVideo) {
      const videoElement = document.querySelector('.vr-demo-video');
      if (videoElement) {
        videoElement.pause();
      }
    }
  };

  const handleDirectDownload = async () => {
    try {
      console.log('📥 Starting direct download...');
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Revoke the object URL after the download has been triggered
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);

      console.log('✅ Download triggered');
    } catch (error) {
      console.error('❌ Direct download failed, falling back to opening URL:', error);
      // Fallback: open the file directly (browser will handle it)
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };



  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/app"
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Home size={16} />
              Home
            </Link>
            <span className="font-oswald font-medium text-2xl text-white">AXORA</span>
          </div>
          <nav className="flex items-center gap-3">
            <button 
              onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
                modal.innerHTML = `
                  <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md mx-4 shadow-2xl">
                    <h3 class="text-white text-lg font-semibold mb-3">VR Help</h3>
                    <ul class="space-y-2 text-sm text-gray-300">
                      <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#AC5757]"></div>
                        <span>Getting started guide</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#AC5757]"></div>
                        <span>Headset setup instructions</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#AC5757]"></div>
                        <span>Troubleshooting tips</span>
                      </li>
                      <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#AC5757]"></div>
                        <span>Controls reference</span>
                      </li>
                    </ul>
                    <div class="mt-6 flex justify-end">
                      <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors">
                        OK
                      </button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) modal.remove();
                });
              }}
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <HelpCircle size={16} />
              Help
            </button>
            <Link 
              to="/app/support"
              className="rounded-xl border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-6 grid lg:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          <div className="mb-6">
            <h1 className="font-judson text-4xl md:text-5xl font-bold text-white mb-4">
              Axora VR Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Step inside immersive learning. Walk through VR models, present designs, and receive real‑time critique in a shared virtual space.
            </p>
          </div>

          {/* VR Preview Area */}
          <div className="vr-preview-area relative rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 mb-8">
            <div className="aspect-video w-full">
              {showVideo ? (
                <div className="w-full h-full relative bg-black rounded-lg">
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs z-10">
                    VIDEO PLAYING
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs z-10">
                    Sources: 1
                  </div>
                  <video 
                    className="vr-demo-video w-full h-full object-cover rounded-lg"
                    controls
                    muted
                    playsInline
                    preload="auto"
                    loop
                    style={{backgroundColor: 'black'}}
                    onLoadStart={() => {
                      console.log('🔄 Video loading from Vercel Blob...');
                    }}
                    onLoadedData={(e) => {
                      console.log('✅ VR Walkthrough loaded and ready to play');
                      console.log('📊 Video dimensions:', e.target.videoWidth, 'x', e.target.videoHeight);
                      console.log('🎯 Successfully loaded video source:', e.target.currentSrc);
                      console.log('☁️ Source: Vercel Blob cloud storage');
                    }}
                    onCanPlay={() => {
                      console.log('✅ Video can play - ready for playback');
                    }}
                    onPlay={() => {
                      console.log('▶️ VR Walkthrough started playing');
                    }}
                    onError={(e) => {
                      console.error('❌ Video error:', e);
                      console.error('❌ Error details:', e.target.error);
                      console.error('❌ Video src:', e.target.currentSrc);
                      console.error('❌ Video failed to load - check if file exists');
                    }}
                    onLoadedMetadata={(e) => {
                      console.log('📊 Video metadata loaded');
                      console.log('📊 Current source:', e.target.currentSrc);
                      console.log('📊 Video ready state:', e.target.readyState);
                      console.log('📊 Video duration:', e.target.duration);
                    }}
                  >
                    <source 
                      src={videoSource} 
                      type="video/mp4"
                    />
                    <p className="text-center p-4 text-white">
                      Your browser does not support the video tag. 
                      <br />
                      <a href={downloadUrl} className="text-[#AC5757] underline mr-2" target="_blank" rel="noopener noreferrer">
                        Play video directly
                      </a>
                      |
                      <a href={downloadUrl} className="text-[#AC5757] underline ml-2" download={downloadFilename}>
                        Download video
                      </a>
                    </p>
                  </video>
                </div>
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundColor: '#6B7280'
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="text-center relative z-10">
                    <div className="mx-auto mb-6 h-20 w-20 rounded-full border-2 border-[#AC5757] grid place-items-center bg-[#AC5757]/10">
                      <Glasses size={32} className="text-[#AC5757]" />
                    </div>
                    <p className="text-gray-200 text-lg font-medium mb-2">VR Demo Preview</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gray-900/80 backdrop-blur border-t border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Mode: <span className="font-semibold text-white">{showVideo ? 'Playing' : 'Preview'}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDirectDownload}
                  className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-400 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                <button 
                  onClick={() => handleLaunchVR('VR Walkthrough')}
                  className="px-4 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V17M6 10V9a3 3 0 113-3v1m0 0V9a3 3 0 013-3v1" />
                  </svg>
                  {showVideo ? 'Restart Walkthrough' : 'Launch Walkthrough'}
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Quick Start */}
          <div className="rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
            <h2 className="font-judson text-xl font-semibold text-white mb-4">Quick Start</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-400" />
                  Headset
                </span>
                <span className="text-green-400 font-medium">Connected</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-400" />
                  Controllers
                </span>
                <span className="text-green-400 font-medium">Ready</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                  Room Scale
                </span>
                <button 
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 class="text-white text-xl font-semibold mb-6">Room Scale Calibration</h3>
                        
                        <div class="space-y-6">
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Play Area Boundaries
                            </h4>
                            <div class="grid md:grid-cols-2 gap-4">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Room Length (ft)</label>
                                <input 
                                  type="number" 
                                  value="8" 
                                  min="3" 
                                  max="20"
                                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]"
                                />
                              </div>
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Room Width (ft)</label>
                                <input 
                                  type="number" 
                                  value="6" 
                                  min="3" 
                                  max="20"
                                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]"
                                />
                              </div>
                            </div>
                            <div class="mt-3">
                              <label class="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                <span>Auto-detect room boundaries using sensors</span>
                              </label>
                            </div>
                          </div>
                          
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Height Calibration
                            </h4>
                            <div class="grid md:grid-cols-2 gap-4">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">User Height (ft)</label>
                                <input 
                                  type="number" 
                                  value="5.8" 
                                  min="4" 
                                  max="7"
                                  step="0.1"
                                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]"
                                />
                              </div>
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Eye Level (ft)</label>
                                <input 
                                  type="number" 
                                  value="5.5" 
                                  min="3.5" 
                                  max="6.5"
                                  step="0.1"
                                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]"
                                />
                              </div>
                            </div>
                            <div class="mt-3">
                              <button class="px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">
                                Auto-calibrate using headset sensors
                              </button>
                            </div>
                          </div>
                          
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Guardian Setup
                            </h4>
                            <div class="space-y-3">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Guardian Sensitivity</label>
                                <select class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]">
                                  <option value="low">Low - Only major boundary crossings</option>
                                  <option value="medium" selected>Medium - Standard sensitivity</option>
                                  <option value="high">High - All boundary proximity warnings</option>
                                </select>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Show guardian boundaries in VR</span>
                                </label>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable voice warnings</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Safety Zone Configuration
                            </h4>
                            <div class="grid md:grid-cols-2 gap-4">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Safety Buffer (inches)</label>
                                <input 
                                  type="range" 
                                  value="12" 
                                  min="6" 
                                  max="24"
                                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <div class="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>6"</span>
                                  <span id="buffer-value">12"</span>
                                  <span>24"</span>
                                </div>
                              </div>
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Ceiling Height (ft)</label>
                                <input 
                                  type="number" 
                                  value="9" 
                                  min="7" 
                                  max="15"
                                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]"
                                />
                              </div>
                            </div>
                            <div class="mt-3 space-y-2">
                              <label class="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                <span>Enable ceiling detection</span>
                              </label>
                              <label class="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                <span>Pause VR when leaving play area</span>
                              </label>
                            </div>
                          </div>
                          
                          {/* Room Setup Preview */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3">Room Setup Preview</h4>
                            <div class="bg-gray-800 rounded-lg p-4 text-center">
                              <div class="text-gray-400 text-sm mb-2">Current Configuration</div>
                              <div class="text-white font-medium">8ft × 6ft Play Area</div>
                              <div class="text-gray-300 text-sm">12" Safety Buffer • 9ft Ceiling</div>
                              <div class="mt-3">
                                <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                                  Preview in VR
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="mt-6 flex justify-end gap-3">
                          <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm font-semibold transition-colors">
                            Cancel
                          </button>
                          <button onclick="
                            this.closest('.fixed').remove();
                            const toast = document.createElement('div');
                            toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                            toast.innerHTML = '✓ Calibration completed successfully';
                            document.body.appendChild(toast);
                            setTimeout(() => {
                              toast.style.transform = 'translateY(100px)';
                              toast.style.opacity = '0';
                              setTimeout(() => toast.remove(), 300);
                            }, 3000);
                          " class="px-6 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors">
                            Save Configuration
                          </button>
                        </div>
                      </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Add slider functionality
                    const slider = modal.querySelector('.slider');
                    const bufferValue = modal.querySelector('#buffer-value');
                    
                    if (slider && bufferValue) {
                      slider.addEventListener('input', (e) => {
                        bufferValue.textContent = e.target.value + '"';
                      });
                    }
                    
                    modal.addEventListener('click', (e) => {
                      if (e.target === modal) modal.remove();
                    });
                  }}
                  className="underline text-[#AC5757] hover:text-[#8A4A4A] transition-colors"
                >
                  Calibrate
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                  Audio
                </span>
                <button 
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                    modal.innerHTML = `
                      <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h3 class="text-white text-xl font-semibold mb-6">Audio Test & Configuration</h3>
                        
                        <div class="space-y-6">
                          {/* Microphone Input Levels */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Microphone Input Levels
                            </h4>
                            <div class="space-y-3">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Input Volume</label>
                                <input 
                                  type="range" 
                                  value="75" 
                                  min="0" 
                                  max="100"
                                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                  id="mic-volume"
                                />
                                <div class="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>0%</span>
                                  <span id="mic-volume-value">75%</span>
                                  <span>100%</span>
                                </div>
                              </div>
                              <div class="flex items-center gap-2">
                                <button class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors" id="test-mic">
                                  Test Mic
                                </button>
                                <span class="text-gray-400 text-xs" id="mic-status">Ready</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Spatial Audio Output */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Spatial Audio Output
                            </h4>
                            <div class="space-y-3">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Output Volume</label>
                                <input 
                                  type="range" 
                                  value="60" 
                                  min="0" 
                                  max="100"
                                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                  id="audio-volume"
                                />
                                <div class="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>0%</span>
                                  <span id="audio-volume-value">60%</span>
                                  <span>100%</span>
                                </div>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable 3D spatial audio</span>
                                </label>
                              </div>
                              <div class="flex items-center gap-2">
                                <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors" id="test-audio">
                                  Test Audio
                                </button>
                                <span class="text-gray-400 text-xs" id="audio-status">Ready</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Voice Chat Quality */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              Voice Chat Quality
                            </h4>
                            <div class="space-y-3">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Voice Quality</label>
                                <select class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-[#AC5757]">
                                  <option value="low">Low - 8kHz (faster)</option>
                                  <option value="medium" selected>Medium - 16kHz (balanced)</option>
                                  <option value="high">High - 48kHz (best quality)</option>
                                </select>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable noise cancellation</span>
                                </label>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable voice activation</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          {/* 3D Positional Sound */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3 flex items-center gap-2">
                              <div class="w-2 h-2 rounded-full bg-[#AC5757]"></div>
                              3D Positional Sound
                            </h4>
                            <div class="space-y-3">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Audio Range (meters)</label>
                                <input 
                                  type="range" 
                                  value="5" 
                                  min="1" 
                                  max="20"
                                  class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                  id="audio-range"
                                />
                                <div class="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>1m</span>
                                  <span id="audio-range-value">5m</span>
                                  <span>20m</span>
                                </div>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable distance-based volume</span>
                                </label>
                              </div>
                              <div>
                                <label class="flex items-center gap-2 text-sm text-gray-300">
                                  <input type="checkbox" checked class="rounded border-gray-500 bg-gray-600 text-[#AC5757] focus:ring-[#AC5757]">
                                  <span>Enable directional audio cues</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          {/* Test Results */}
                          <div class="bg-gray-700/50 rounded-lg p-4">
                            <h4 class="text-white font-medium mb-3">Test Results</h4>
                            <div class="space-y-2 text-sm">
                              <div class="flex justify-between items-center">
                                <span class="text-gray-300">Microphone</span>
                                <span class="text-green-400 font-medium">✓ Working</span>
                              </div>
                              <div class="flex justify-between items-center">
                                <span class="text-gray-300">Speakers</span>
                                <span class="text-green-400 font-medium">✓ Working</span>
                              </div>
                              <div class="flex justify-between items-center">
                                <span class="text-gray-300">Spatial Audio</span>
                                <span class="text-green-400 font-medium">✓ Enabled</span>
                              </div>
                              <div class="flex justify-between items-center">
                                <span class="text-gray-300">Latency</span>
                                <span class="text-green-400 font-medium">12ms</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="mt-6 flex justify-end gap-3">
                          <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm font-semibold transition-colors">
                            Cancel
                          </button>
                          <button onclick="
                            this.closest('.fixed').remove();
                            const toast = document.createElement('div');
                            toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                            toast.innerHTML = '✓ Audio configuration saved successfully';
                            document.body.appendChild(toast);
                            setTimeout(() => {
                              toast.style.transform = 'translateY(100px)';
                              toast.style.opacity = '0';
                              setTimeout(() => toast.remove(), 300);
                            }, 3000);
                          " class="px-6 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors">
                            Save Configuration
                          </button>
                        </div>
                      </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Add interactive functionality for sliders
                    const micVolumeSlider = modal.querySelector('#mic-volume');
                    const micVolumeValue = modal.querySelector('#mic-volume-value');
                    const audioVolumeSlider = modal.querySelector('#audio-volume');
                    const audioVolumeValue = modal.querySelector('#audio-volume-value');
                    const audioRangeSlider = modal.querySelector('#audio-range');
                    const audioRangeValue = modal.querySelector('#audio-range-value');
                    
                    if (micVolumeSlider && micVolumeValue) {
                      micVolumeSlider.addEventListener('input', (e) => {
                        micVolumeValue.textContent = e.target.value + '%';
                      });
                    }
                    
                    if (audioVolumeSlider && audioVolumeValue) {
                      audioVolumeSlider.addEventListener('input', (e) => {
                        audioVolumeValue.textContent = e.target.value + '%';
                      });
                    }
                    
                    if (audioRangeSlider && audioRangeValue) {
                      audioRangeSlider.addEventListener('input', (e) => {
                        audioRangeValue.textContent = e.target.value + 'm';
                      });
                    }
                    
                    // Add test button functionality
                    const testMicBtn = modal.querySelector('#test-mic');
                    const micStatus = modal.querySelector('#mic-status');
                    const testAudioBtn = modal.querySelector('#test-audio');
                    const audioStatus = modal.querySelector('#audio-status');
                    
                    if (testMicBtn && micStatus) {
                      testMicBtn.addEventListener('click', () => {
                        micStatus.textContent = 'Testing...';
                        micStatus.className = 'text-yellow-400 text-xs';
                        setTimeout(() => {
                          micStatus.textContent = 'Test Complete';
                          micStatus.className = 'text-green-400 text-xs';
                        }, 2000);
                      });
                    }
                    
                    if (testAudioBtn && audioStatus) {
                      testAudioBtn.addEventListener('click', () => {
                        audioStatus.textContent = 'Testing...';
                        audioStatus.className = 'text-yellow-400 text-xs';
                        setTimeout(() => {
                          audioStatus.textContent = 'Test Complete';
                          audioStatus.className = 'text-green-400 text-xs';
                        }, 2000);
                      });
                    }
                    
                    modal.addEventListener('click', (e) => {
                      if (e.target === modal) modal.remove();
                    });
                  }}
                  className="underline text-[#AC5757] hover:text-[#8A4A4A] transition-colors"
                >
                  Test
                </button>
              </li>
            </ul>
            <button 
              onClick={() => handleLaunchVR('Quick Start Session')}
              className="mt-6 w-full py-3 rounded-xl bg-[#AC5757] hover:bg-[#8A4A4A] font-semibold transition-colors"
            >
              Start Session
            </button>
          </div>

          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
            <h3 className="font-judson text-lg font-semibold text-white mb-4">Upcoming VR Sessions</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                  <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md w-full shadow-2xl relative">
                    <button id="edit-session-btn" class="absolute top-4 right-12 text-gray-400 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <h3 class="text-white text-lg font-semibold mb-4">Studio Critique – Sec A</h3>
                    <div class="space-y-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-400">Date & Time:</span>
                        <span class="text-white">Today 2:00 PM</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Duration:</span>
                        <span class="text-white">90 minutes</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Type:</span>
                        <span class="text-white">Studio Critique</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Participants:</span>
                        <span class="text-white">Section A (12 students)</span>
                      </div>
                    </div>
                    <div class="mt-4 p-3 bg-gray-700/50 rounded-lg">
                      <h4 class="text-white font-medium mb-2">Description</h4>
                      <p class="text-gray-300 text-sm">Interactive VR critique session for Architecture Studio Section A. Students will present their 3D models in virtual space, receive feedback using laser pointers, and collaborate in real-time voice chat.</p>
                    </div>
                    <div class="mt-4 flex gap-3">
                      <button class="flex-1 px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Join Session</button>
                      <button class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel Session</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                
                // Add event listeners
                modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
                modal.querySelector('#edit-session-btn').addEventListener('click', () => {
                  modal.remove();
                  // Open edit form modal
                  const editFormModal = document.createElement('div');
                  editFormModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                  editFormModal.innerHTML = `
                    <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                      <h3 class="text-white text-xl font-semibold mb-6">Edit Session</h3>
                      
                      <div class="space-y-4">
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Session Title</label>
                          <input type="text" id="edit-title" value="Studio Critique – Sec A" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Time</label>
                          <input type="time" id="edit-time" value="14:00" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Duration (minutes)</label>
                          <input type="number" id="edit-duration" value="90" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Session Type</label>
                          <select id="edit-type" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                            <option value="Studio Critique" selected>Studio Critique</option>
                            <option value="Architecture Walkthrough">Architecture Walkthrough</option>
                            <option value="Urban Sandbox">Urban Sandbox</option>
                          </select>
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Participants</label>
                          <input type="text" id="edit-participants" value="Section A (12 students)" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Description</label>
                          <textarea id="edit-description" rows="3" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">Interactive VR critique session for Architecture Studio Section A. Students will present their 3D models in virtual space, receive feedback using laser pointers, and collaborate in real-time voice chat.</textarea>
                        </div>
                      </div>
                      
                      <div class="mt-6 flex justify-end gap-3">
                        <button id="cancel-edit" class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel</button>
                        <button id="save-edit" class="px-6 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Save Changes</button>
                      </div>
                    </div>
                  `;
                  document.body.appendChild(editFormModal);
                  
                  // Add event listeners for edit form
                  editFormModal.querySelector('#cancel-edit').addEventListener('click', () => editFormModal.remove());
                  editFormModal.querySelector('#save-edit').addEventListener('click', () => {
                    editFormModal.remove();
                    
                    // Show success toast
                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                    toast.innerHTML = '✓ Session updated successfully';
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      toast.style.transform = 'translateY(100px)';
                      toast.style.opacity = '0';
                      setTimeout(() => toast.remove(), 300);
                    }, 3000);
                  });
                  
                  editFormModal.addEventListener('click', (e) => {
                    if (e.target === editFormModal) editFormModal.remove();
                  });
                });
                
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) modal.remove();
                });
              }}>
                <span className="font-medium text-white">Studio Critique – Sec A</span>
                <span className="text-gray-300">Today 2:00 PM</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                  <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md w-full shadow-2xl relative">
                    <button id="edit-session-btn" class="absolute top-4 right-12 text-gray-400 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <h3 class="text-white text-lg font-semibold mb-4">Urban Sandbox – Team 3</h3>
                    <div class="space-y-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-400">Date & Time:</span>
                        <span class="text-white">Thu 11:30 AM</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Duration:</span>
                        <span class="text-white">60 minutes</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Type:</span>
                        <span class="text-white">Urban Sandbox</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Participants:</span>
                        <span class="text-white">Team 3 (4 members)</span>
                      </div>
                    </div>
                    <div class="mt-4 p-3 bg-gray-700/50 rounded-lg">
                      <h4 class="text-white font-medium mb-2">Description</h4>
                      <p class="text-gray-300 text-sm">Experimental urban planning session using VR massing tools. Team 3 will place building blocks, simulate sun paths, and annotate context in mixed reality environment.</p>
                    </div>
                    <div class="mt-4 flex gap-3">
                      <button class="flex-1 px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Join Session</button>
                      <button class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel Session</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                
                // Add event listeners
                modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
                modal.querySelector('#edit-session-btn').addEventListener('click', () => {
                  modal.remove();
                  // Open edit form modal
                  const editFormModal = document.createElement('div');
                  editFormModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                  editFormModal.innerHTML = `
                    <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                      <h3 class="text-white text-xl font-semibold mb-6">Edit Session</h3>
                      
                      <div class="space-y-4">
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Session Title</label>
                          <input type="text" id="edit-title" value="Urban Sandbox – Team 3" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Time</label>
                          <input type="time" id="edit-time" value="11:30" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Duration (minutes)</label>
                          <input type="number" id="edit-duration" value="60" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Session Type</label>
                          <select id="edit-type" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                            <option value="Studio Critique">Studio Critique</option>
                            <option value="Architecture Walkthrough">Architecture Walkthrough</option>
                            <option value="Urban Sandbox" selected>Urban Sandbox</option>
                          </select>
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Participants</label>
                          <input type="text" id="edit-participants" value="Team 3 (4 members)" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Description</label>
                          <textarea id="edit-description" rows="3" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">Experimental urban planning session using VR massing tools. Team 3 will place building blocks, simulate sun paths, and annotate context in mixed reality environment.</textarea>
                        </div>
                      </div>
                      
                      <div class="mt-6 flex justify-end gap-3">
                        <button id="cancel-edit" class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel</button>
                        <button id="save-edit" class="px-6 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Save Changes</button>
                      </div>
                    </div>
                  `;
                  document.body.appendChild(editFormModal);
                  
                  // Add event listeners for edit form
                  editFormModal.querySelector('#cancel-edit').addEventListener('click', () => editFormModal.remove());
                  editFormModal.querySelector('#save-edit').addEventListener('click', () => {
                    editFormModal.remove();
                    
                    // Show success toast
                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                    toast.innerHTML = '✓ Session updated successfully';
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      toast.style.transform = 'translateY(100px)';
                      toast.style.opacity = '0';
                      setTimeout(() => toast.remove(), 300);
                    }, 3000);
                  });
                  
                  editFormModal.addEventListener('click', (e) => {
                    if (e.target === editFormModal) editFormModal.remove();
                  });
                });
                
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) modal.remove();
                });
              }}>
                <span className="font-medium text-white">Urban Sandbox – Team 3</span>
                <span className="text-gray-300">Thu 11:30 AM</span>
              </li>
              <li className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                  <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md w-full shadow-2xl relative">
                    <button id="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <h3 class="text-white text-lg font-semibold mb-4">Interior Walkthrough</h3>
                    <div class="space-y-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-400">Date & Time:</span>
                        <span class="text-white">Fri 4:00 PM</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Duration:</span>
                        <span class="text-white">45 minutes</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Type:</span>
                        <span class="text-white">Architecture Walkthrough</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-400">Participants:</span>
                        <span class="text-white">Client & Design Team</span>
                      </div>
                    </div>
                    <div class="mt-4 p-3 bg-gray-700/50 rounded-lg">
                      <h4 class="text-white font-medium mb-2">Description</h4>
                      <p class="text-gray-300 text-sm">Client presentation walkthrough of interior design proposal. Navigate through 3D interior spaces at true scale, explore material finishes, and discuss design decisions in immersive VR environment.</p>
                    </div>
                    <div class="mt-4 flex gap-3">
                      <button class="flex-1 px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Join Session</button>
                      <button class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel Session</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                
                // Add event listeners
                modal.querySelector('#close-modal').addEventListener('click', () => modal.remove());
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) modal.remove();
                });
              }}>
                <span className="font-medium text-white">Interior Walkthrough</span>
                <span className="text-gray-300">Fri 4:00 PM</span>
              </li>
            </ul>
            <button 
              onClick={() => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                modal.innerHTML = `
                  <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                    <h3 class="text-white text-xl font-semibold mb-6">Schedule VR Session</h3>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Walkthrough Title</label>
                          <input 
                            type="text" 
                            placeholder="Enter session title..."
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AC5757]"
                          />
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Duration</label>
                          <select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#AC5757]">
                            <option value="">Select duration</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Session Type</label>
                          <select class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#AC5757]">
                            <option value="">Select session type</option>
                            <option value="architecture">Architecture Walkthrough</option>
                            <option value="critique">Studio Critique</option>
                            <option value="sandbox">Urban Sandbox</option>
                            <option value="presentation">Presentation</option>
                          </select>
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Participants</label>
                          <input 
                            type="text" 
                            placeholder="Enter participant emails..."
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AC5757]"
                          />
                        </div>
                        
                        <div>
                          <label class="block text-gray-300 text-sm font-medium mb-2">Description <span class="text-red-400">*</span></label>
                          <textarea 
                            placeholder="Enter session description..."
                            rows="3"
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#AC5757] resize-none"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div>
                        <div class="flex items-center justify-between mb-4">
                          <h4 class="text-white font-medium">Select Date & Time</h4>
                          <span class="text-gray-400 text-sm" id="current-month-year"></span>
                        </div>
                        
                        <div class="bg-gray-700 rounded-lg p-4">
                          <div class="grid grid-cols-7 gap-1 mb-2">
                            <div class="text-center text-xs text-gray-400 py-1">Sun</div>
                            <div class="text-center text-xs text-gray-400 py-1">Mon</div>
                            <div class="text-center text-xs text-gray-400 py-1">Tue</div>
                            <div class="text-center text-xs text-gray-400 py-1">Wed</div>
                            <div class="text-center text-xs text-gray-400 py-1">Thu</div>
                            <div class="text-center text-xs text-gray-400 py-1">Fri</div>
                            <div class="text-center text-xs text-gray-400 py-1">Sat</div>
                          </div>
                          <div id="calendar-grid" class="grid grid-cols-7 gap-1">
                            <!-- Calendar days will be generated here -->
                          </div>
                        </div>
                        
                        <div class="mt-4">
                          <label class="block text-gray-300 text-sm font-medium mb-2">Available Time Slots</label>
                          <div class="grid grid-cols-3 gap-2" id="time-slots">
                            <!-- Time slots will be generated here -->
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mt-6 flex justify-end gap-3">
                      <button id="cancel-btn" class="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm font-semibold transition-colors">
                        Cancel
                      </button>
                      <button id="schedule-btn" class="px-6 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm font-semibold transition-colors">
                        Schedule Session
                      </button>
                    </div>
                  </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add event listeners for buttons
                const cancelBtn = modal.querySelector('#cancel-btn');
                const scheduleBtn = modal.querySelector('#schedule-btn');
                
                // Initially disable schedule button
                scheduleBtn.disabled = true;
                scheduleBtn.classList.add('opacity-50', 'cursor-not-allowed');
                scheduleBtn.classList.remove('hover:bg-[#8A4A4A]');
                
                // Form validation function
                const checkFormCompletion = () => {
                  const titleInput = modal.querySelector('input[placeholder="Enter session title..."]');
                  const durationSelect = modal.querySelector('select');
                  const sessionTypeSelect = modal.querySelectorAll('select')[1];
                  const participantsInput = modal.querySelector('input[placeholder="Enter participant emails..."]');
                  const descriptionTextarea = modal.querySelector('textarea[placeholder="Enter session description..."]');
                  const selectedDate = modal.querySelector('.bg-blue-600');
                  const selectedTime = modal.querySelector('#time-slots button[data-selected="true"]');
                  
                  // Debug validation
                  console.log('Validation - Title input found:', !!titleInput);
                  console.log('Validation - Title input value:', titleInput ? titleInput.value : 'N/A');
                  
                  const isComplete = titleInput && titleInput.value.trim() && 
                                   durationSelect && durationSelect.value && 
                                   sessionTypeSelect && sessionTypeSelect.value && 
                                   participantsInput && participantsInput.value.trim() && 
                                   descriptionTextarea && descriptionTextarea.value.trim() &&
                                   selectedDate && 
                                   selectedTime;
                  
                  if (isComplete) {
                    scheduleBtn.disabled = false;
                    scheduleBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    scheduleBtn.classList.add('hover:bg-[#8A4A4A]');
                  } else {
                    scheduleBtn.disabled = true;
                    scheduleBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    scheduleBtn.classList.remove('hover:bg-[#8A4A4A]');
                  }
                };
                
                // Add event listeners to form inputs
                modal.querySelectorAll('input, select').forEach(input => {
                  input.addEventListener('input', checkFormCompletion);
                  input.addEventListener('change', checkFormCompletion);
                });
                
                cancelBtn.addEventListener('click', () => {
                  modal.remove();
                });
                
                scheduleBtn.addEventListener('click', async () => {
                  // Get form data with more specific selectors
                  const titleInput = modal.querySelector('input[placeholder="Enter session title..."]');
                  const durationSelect = modal.querySelector('select');
                  const sessionTypeSelect = modal.querySelectorAll('select')[1];
                  const participantsInput = modal.querySelector('input[placeholder="Enter participant emails..."]');
                  const descriptionTextarea = modal.querySelector('textarea[placeholder="Enter session description..."]');
                  const selectedDate = modal.querySelector('.bg-blue-600');
                  const selectedTime = modal.querySelector('#time-slots button[data-selected="true"]');
                  
                  // Debug: Check if title input exists and has value
                  console.log('Title input found:', !!titleInput);
                  console.log('Title input value:', titleInput ? titleInput.value : 'N/A');
                  
                  // Try alternative selector if first one fails
                  if (!titleInput) {
                    const altTitleInput = modal.querySelector('input[type="text"]');
                    console.log('Alternative title input found:', !!altTitleInput);
                    console.log('Alternative title input value:', altTitleInput ? altTitleInput.value : 'N/A');
                  }
                  
                  const title = titleInput ? titleInput.value.trim() : '';
                  const duration = durationSelect ? durationSelect.value : '';
                  const sessionType = sessionTypeSelect ? sessionTypeSelect.value : '';
                  const participants = participantsInput ? participantsInput.value.trim() : '';
                  const description = descriptionTextarea ? descriptionTextarea.value.trim() : '';
                  const dateText = selectedDate ? selectedDate.textContent.trim() : 'Today';
                  const timeText = selectedTime ? selectedTime.textContent.trim() : '2:00 PM';
                  
                  // Format the date display
                  let displayDate = dateText;
                  if (selectedDate) {
                    const day = selectedDate.textContent.trim();
                    const today = new Date();
                    const selectedDateObj = new Date(today.getFullYear(), today.getMonth(), parseInt(day));
                    
                    if (day === today.getDate().toString()) {
                      displayDate = 'Today';
                    } else {
                      const tomorrow = new Date(today);
                      tomorrow.setDate(today.getDate() + 1);
                      if (day === tomorrow.getDate().toString()) {
                        displayDate = 'Tomorrow';
                      } else {
                        displayDate = selectedDateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                      }
                    }
                  }
                  
                  // Debug logging
                  console.log('Form data:', { title, duration, sessionType, participants, description, dateText, timeText });
                  console.log('Title input value:', titleInput ? titleInput.value : 'No title input found');
                  
                  // Ensure we have a valid title
                  const sessionTitle = title && title.trim() ? title.trim() : 'New VR Session';
                  
                  // Prepare session data for API
                  const sessionData = {
                    title: sessionTitle,
                    date: displayDate,
                    time: timeText,
                    duration: duration,
                    sessionType: sessionType,
                    participants: participants,
                    description: description,
                    isPersonal: true // Mark as personal session for edit functionality
                  };

                  try {
                    // Save session to localStorage
                    const savedSession = VRSessionsAPI.createSession(sessionData);
                    console.log('✅ Session saved to localStorage:', savedSession);
                    
                    // Update local state
                    setVrSessions(prev => [...prev, savedSession]);
                    
                    // Create session with actual data
                    const upcomingSessions = document.querySelector('.space-y-4');
                    if (upcomingSessions) {
                      const newSession = document.createElement('li');
                      newSession.className = 'flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors cursor-pointer';
                      newSession.innerHTML = `<span class="font-medium text-white">${sessionTitle}</span><span class="text-gray-300">${displayDate} ${timeText}</span>`;
                      
                      // Store session data as attributes for use in pop-up
                      newSession.setAttribute('data-session-id', savedSession.id);
                      newSession.setAttribute('data-title', sessionTitle);
                      newSession.setAttribute('data-date', displayDate);
                      newSession.setAttribute('data-time', timeText);
                      newSession.setAttribute('data-duration', duration);
                      newSession.setAttribute('data-type', sessionType);
                      newSession.setAttribute('data-participants', participants);
                      newSession.setAttribute('data-description', description);
                    
                    // Add click handler for personal session with edit option
                    newSession.addEventListener('click', () => {
                      const editModal = document.createElement('div');
                      editModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                      editModal.innerHTML = `
                        <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-md w-full shadow-2xl relative">
                          <button id="close-edit-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                          <button id="edit-session-btn" class="absolute top-4 right-12 text-gray-400 hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <h3 class="text-white text-lg font-semibold mb-4">${newSession.getAttribute('data-title')}</h3>
                          <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                              <span class="text-gray-400">Date & Time:</span>
                              <span class="text-white">${newSession.getAttribute('data-date')} ${newSession.getAttribute('data-time')}</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-gray-400">Duration:</span>
                              <span class="text-white">${newSession.getAttribute('data-duration')} minutes</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-gray-400">Type:</span>
                              <span class="text-white">${newSession.getAttribute('data-type')}</span>
                            </div>
                            <div class="flex justify-between">
                              <span class="text-gray-400">Participants:</span>
                              <span class="text-white">${newSession.getAttribute('data-participants')}</span>
                            </div>
                          </div>
                          <div class="mt-4 p-3 bg-gray-700/50 rounded-lg">
                            <h4 class="text-white font-medium mb-2">Description</h4>
                            <p class="text-gray-300 text-sm">${newSession.getAttribute('data-description')}</p>
                          </div>
                          <div class="mt-4 flex gap-3">
                            <button class="flex-1 px-4 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Join Session</button>
                            <button class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel Session</button>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(editModal);
                      
                      // Add event listeners
                      editModal.querySelector('#close-edit-modal').addEventListener('click', () => editModal.remove());
                      editModal.querySelector('#edit-session-btn').addEventListener('click', () => {
                        editModal.remove();
                        // Open edit form modal
                        const editFormModal = document.createElement('div');
                        editFormModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
                        editFormModal.innerHTML = `
                          <div class="bg-gray-800 rounded-xl border border-gray-600 p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                            <h3 class="text-white text-xl font-semibold mb-6">Edit Session</h3>
                            
                            <div class="space-y-4">
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Session Title</label>
                                <input type="text" id="edit-title" value="${newSession.getAttribute('data-title')}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                              </div>
                              
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Time</label>
                                <input type="time" id="edit-time" value="${newSession.getAttribute('data-time').replace(' AM', '').replace(' PM', '')}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                              </div>
                              
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Duration (minutes)</label>
                                <input type="number" id="edit-duration" value="${newSession.getAttribute('data-duration')}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                              </div>
                              
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Session Type</label>
                                <select id="edit-type" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                                  <option value="Studio Critique" ${newSession.getAttribute('data-type') === 'Studio Critique' ? 'selected' : ''}>Studio Critique</option>
                                  <option value="Architecture Walkthrough" ${newSession.getAttribute('data-type') === 'Architecture Walkthrough' ? 'selected' : ''}>Architecture Walkthrough</option>
                                  <option value="Urban Sandbox" ${newSession.getAttribute('data-type') === 'Urban Sandbox' ? 'selected' : ''}>Urban Sandbox</option>
                                </select>
                              </div>
                              
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Participants</label>
                                <input type="text" id="edit-participants" value="${newSession.getAttribute('data-participants')}" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">
                              </div>
                              
                              <div>
                                <label class="block text-gray-300 text-sm font-medium mb-2">Description</label>
                                <textarea id="edit-description" rows="3" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#AC5757] focus:border-transparent">${newSession.getAttribute('data-description')}</textarea>
                              </div>
                            </div>
                            
                            <div class="mt-6 flex justify-end gap-3">
                              <button id="cancel-edit" class="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">Cancel</button>
                              <button id="save-edit" class="px-6 py-2 bg-[#AC5757] hover:bg-[#8A4A4A] text-white text-sm rounded-lg transition-colors">Save Changes</button>
                            </div>
                          </div>
                        `;
                        document.body.appendChild(editFormModal);
                        
                        // Add event listeners for edit form
                        editFormModal.querySelector('#cancel-edit').addEventListener('click', () => editFormModal.remove());
                        editFormModal.querySelector('#save-edit').addEventListener('click', () => {
                          try {
                            // Get updated session data
                            const title = editFormModal.querySelector('#edit-title').value;
                            const time = editFormModal.querySelector('#edit-time').value;
                            const duration = editFormModal.querySelector('#edit-duration').value;
                            const type = editFormModal.querySelector('#edit-type').value;
                            const participants = editFormModal.querySelector('#edit-participants').value;
                            const description = editFormModal.querySelector('#edit-description').value;
                            
                            // Get session ID
                            const sessionId = newSession.getAttribute('data-session-id');
                            
                            // Prepare updated session data
                            const updatedSessionData = {
                              id: sessionId,
                              title: title,
                              date: newSession.getAttribute('data-date'),
                              time: time,
                              duration: duration,
                              sessionType: type,
                              participants: participants,
                              description: description,
                              isPersonal: true
                            };
                            
                            // Update session in localStorage
                            const savedSession = VRSessionsAPI.updateSession(updatedSessionData);
                            console.log('✅ Session updated in localStorage:', savedSession);
                            
                            // Update local state
                            setVrSessions(prev => prev.map(session => 
                              session.id === sessionId ? savedSession : session
                            ));
                            
                            // Update the session display
                            newSession.innerHTML = `<span class="font-medium text-white">${title}</span><span class="text-gray-300">${newSession.getAttribute('data-date')} ${time}</span>`;
                            
                            // Update data attributes
                            newSession.setAttribute('data-title', title);
                            newSession.setAttribute('data-time', time);
                            newSession.setAttribute('data-duration', duration);
                            newSession.setAttribute('data-type', type);
                            newSession.setAttribute('data-participants', participants);
                            newSession.setAttribute('data-description', description);
                            
                            editFormModal.remove();
                            
                            // Show success toast
                            const toast = document.createElement('div');
                            toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                            toast.innerHTML = '✓ Session updated successfully';
                            document.body.appendChild(toast);
                            setTimeout(() => {
                              toast.style.transform = 'translateY(100px)';
                              toast.style.opacity = '0';
                              setTimeout(() => toast.remove(), 300);
                            }, 3000);
                          } catch (error) {
                            console.error('Failed to update session:', error);
                            
                            // Show error toast
                            const errorToast = document.createElement('div');
                            errorToast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                            errorToast.innerHTML = '❌ Failed to update session. Please try again.';
                            document.body.appendChild(errorToast);
                            setTimeout(() => {
                              errorToast.style.transform = 'translateY(100px)';
                              errorToast.style.opacity = '0';
                              setTimeout(() => errorToast.remove(), 300);
                            }, 3000);
                          }
                        });
                        
                        editFormModal.addEventListener('click', (e) => {
                          if (e.target === editFormModal) editFormModal.remove();
                        });
                      });
                      
                      editModal.addEventListener('click', (e) => {
                        if (e.target === editModal) editModal.remove();
                      });
                    });
                    
                      // Add session and sort by time
                      upcomingSessions.insertBefore(newSession, upcomingSessions.firstChild);
                      sortSessionsByTime();
                    }
                    
                    // Show success toast
                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                    toast.innerHTML = '✓ Session scheduled successfully';
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      toast.style.transform = 'translateY(100px)';
                      toast.style.opacity = '0';
                      setTimeout(() => toast.remove(), 300);
                    }, 3000);
                    
                    modal.remove();
                  } catch (error) {
                    console.error('Failed to save session:', error);
                    
                    // Show error toast
                    const errorToast = document.createElement('div');
                    errorToast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transform translate-y-0 transition-all duration-300';
                    errorToast.innerHTML = '❌ Failed to save session. Please try again.';
                    document.body.appendChild(errorToast);
                    setTimeout(() => {
                      errorToast.style.transform = 'translateY(100px)';
                      errorToast.style.opacity = '0';
                      setTimeout(() => errorToast.remove(), 300);
                    }, 3000);
                  }
                });
                
                
                // Generate calendar
                const generateCalendar = () => {
                  const now = new Date();
                  const currentMonth = now.getMonth();
                  const currentYear = now.getFullYear();
                  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
                  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                  
                  document.getElementById('current-month-year').textContent = 
                    now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  
                  const calendarGrid = document.getElementById('calendar-grid');
                  calendarGrid.innerHTML = '';
                  
                  // Empty cells for days before the first day of the month
                  for (let i = 0; i < firstDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'h-8';
                    calendarGrid.appendChild(emptyDay);
                  }
                  
                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'text-center text-sm py-1 cursor-pointer hover:bg-gray-600 rounded transition-colors';
                    dayElement.textContent = day;
                    
                    if (day === now.getDate()) {
                      dayElement.className += ' bg-[#AC5757] text-white';
                    } else {
                      dayElement.className += ' text-gray-300';
                    }
                    
                    dayElement.addEventListener('click', () => {
                      // Remove previous selection - use a more reliable approach
                      calendarGrid.querySelectorAll('div').forEach(el => {
                        if (el.classList.contains('bg-blue-600')) {
                          el.classList.remove('bg-blue-600');
                          el.classList.add('text-gray-300');
                        }
                      });
                      
                      // Add selection to clicked day
                      dayElement.classList.add('bg-blue-600');
                      dayElement.classList.remove('text-gray-300');
                      
                      // Generate time slots for selected day
                      generateTimeSlots();
                      
                      // Check form completion after date selection
                      setTimeout(checkFormCompletion, 100);
                    });
                    
                    calendarGrid.appendChild(dayElement);
                  }
                };
                
                // Generate time slots
                const generateTimeSlots = () => {
                  const timeSlotsContainer = document.getElementById('time-slots');
                  timeSlotsContainer.innerHTML = '';
                  
                  const timeSlots = [
                    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
                    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
                  ];
                  
                  timeSlots.forEach(time => {
                    const timeSlot = document.createElement('button');
                    timeSlot.className = 'px-2 py-1 text-xs rounded border border-gray-600 hover:bg-gray-600 text-gray-300 transition-colors';
                    timeSlot.textContent = time;
                    
                    timeSlot.addEventListener('click', () => {
                      // Remove previous selection - use a more reliable approach
                      timeSlotsContainer.querySelectorAll('button').forEach(el => {
                        if (el.classList.contains('bg-[#AC5757]')) {
                          el.classList.remove('bg-[#AC5757]');
                          el.classList.add('border-gray-600');
                          el.classList.add('text-gray-300');
                          el.removeAttribute('data-selected');
                        }
                      });
                      
                      // Add selection to clicked time
                      timeSlot.classList.add('bg-[#AC5757]');
                      timeSlot.classList.remove('border-gray-600');
                      timeSlot.classList.remove('text-gray-300');
                      timeSlot.setAttribute('data-selected', 'true');
                      
                      // Check form completion after time selection
                      setTimeout(checkFormCompletion, 100);
                    });
                    
                    timeSlotsContainer.appendChild(timeSlot);
                  });
                };
                
                // Initialize calendar and time slots
                generateCalendar();
                generateTimeSlots();
                
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) modal.remove();
                });
              }}
              className="mt-4 w-full py-3 rounded-xl border border-gray-600 hover:bg-gray-700 transition-colors"
            >
              Schedule Session
            </button>
          </div>
        </aside>
      </section>

      {/* VR Modules - Dynamically Generated */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="font-judson text-2xl font-bold text-white mb-6">Modules</h2>
        <div id="dynamic-modules" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modules will be dynamically generated here */}
        </div>
      </section>

      {/* Requirements & Troubleshooting */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
          <h3 className="font-judson text-lg font-semibold text-white mb-4">System Requirements</h3>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <Bullet />
              Supported: Quest 2/3, Vision Pro (beta), SteamVR
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Internet ≥ 25 Mbps, latency ≤ 60ms
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Recommended: 2m × 2m playspace
            </li>
            <li className="flex items-center gap-3">
              <Bullet />
              Optional: Stylus/pen for annotations
            </li>
          </ul>
        </div>
        <div className="lg:col-span-4 rounded-2xl border border-gray-700 p-6 bg-gray-800/50">
          <h3 className="font-judson text-lg font-semibold text-white mb-4">Troubleshooting</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <span className="font-semibold text-white">No video?</span> Upload a demo clip above.
            </li>
            <li>
              <span className="font-semibold text-white">Headset not found?</span> Re‑plug USB or restart Link.
            </li>
            <li>
              <span className="font-semibold text-white">Choppy audio?</span> Switch to wired headphones.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} AXORA. VR Studio is in beta.
        </p>
      </footer>
    </div>
  );
};

function ModeCard({ title, desc, badge, onLaunch, onPreview }) {
  return (
    <div className="group rounded-2xl border border-gray-700 bg-gray-800/50 p-6 hover:border-[#AC5757] hover:bg-gray-800 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-judson text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs px-3 py-1 rounded-full border border-gray-600 text-gray-300 bg-gray-700">
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-6 leading-relaxed">{desc}</p>
      <div className="flex items-center gap-3">
        <button 
          onClick={onLaunch}
          className="flex-1 px-4 py-2 rounded-lg bg-[#AC5757] hover:bg-[#8A4A4A] text-sm font-semibold transition-colors"
        >
          Launch
        </button>
        <button 
          onClick={onPreview}
          className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 text-sm transition-colors"
        >
          Preview
        </button>
      </div>
    </div>
  );
}

function Bullet() {
  return (
    <div className="w-2 h-2 rounded-full bg-[#AC5757]"></div>
  );
}

export default VRLanding;