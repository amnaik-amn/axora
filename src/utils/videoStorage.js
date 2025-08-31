// Video storage utility for handling both local and Vercel Blob storage
// This provides fallback support to ensure videos work both locally and in production

const VIDEO_CONFIG = {
  // Local development paths (for localhost)
  local: {
    primary: '/assets/Ananya_Naik_Walkthrough_Final.mp4',
    fallbacks: [
      '/assets/VR_Walkthrough_Universal.mp4',
      '/assets/VR_Walkthrough_Browser_Optimized.mp4'
    ]
  },
  
  // Vercel Blob URLs (from environment variables) - DISABLED for now
  blob: {
    primary: null, // Disabled until proper Blob setup
    fallbacks: []
  }
};

// Get the current domain for absolute URLs
const getCurrentDomain = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

/**
 * Get video sources in order of preference
 * @returns {Array} Array of video source objects
 */
export const getVideoSources = () => {
  const sources = [];
  const domain = getCurrentDomain();
  
  // For Vercel deployment, try multiple URL formats
  if (domain && domain.includes('vercel.app')) {
    // Vercel deployment - try different URL patterns
    sources.push({
      src: domain + '/assets/Ananya_Naik_Walkthrough_Final.mp4',
      type: 'video/mp4',
      label: 'Ananya Naik VR Walkthrough (Vercel Primary)'
    });
    
    // Try relative path for Vercel (this often works better)
    sources.push({
      src: '/assets/Ananya_Naik_Walkthrough_Final.mp4',
      type: 'video/mp4',
      label: 'Ananya Naik VR Walkthrough (Vercel Relative)'
    });
    
    // Try without leading slash for Vercel
    sources.push({
      src: domain + 'assets/Ananya_Naik_Walkthrough_Final.mp4',
      type: 'video/mp4',
      label: 'Ananya Naik VR Walkthrough (Vercel Alt)'
    });
  }
  
  // Local development - use standard paths
  sources.push({
    src: '/assets/Ananya_Naik_Walkthrough_Final.mp4',
    type: 'video/mp4',
    label: 'Ananya Naik VR Walkthrough (Local)'
  });
  
  // Add optimized fallbacks
  sources.push({
    src: '/assets/VR_Walkthrough_Universal.mp4',
    type: 'video/mp4',
    label: 'VR Walkthrough Universal (Fallback 1)'
  });
  
  sources.push({
    src: '/assets/VR_Walkthrough_Browser_Optimized.mp4',
    type: 'video/mp4',
    label: 'VR Walkthrough Browser Optimized (Fallback 2)'
  });
  
  return sources;
};

/**
 * Get download URL for the video
 * @returns {string} Download URL
 */
export const getDownloadUrl = () => {
  // For now, always use local assets path
  // This ensures downloads work consistently
  return '/assets/Ananya_Naik_Walkthrough_Final.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'Ananya_Naik_VR_Walkthrough.mp4';
};

/**
 * Update Vercel Blob URL (called after successful upload)
 * @param {string} blobUrl The Vercel Blob URL
 */
export const setBlobUrl = (blobUrl) => {
  VIDEO_CONFIG.blob.primary = blobUrl;
  console.log('✅ Vercel Blob URL set:', blobUrl);
};

// Export the config for debugging
export { VIDEO_CONFIG };
