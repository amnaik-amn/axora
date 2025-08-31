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
  
  // Vercel Blob URLs (from environment variables)
  blob: {
    primary: process.env.REACT_APP_VERCEL_BLOB_VIDEO_URL || null,
    fallbacks: []
  }
};

/**
 * Get video sources in order of preference
 * @returns {Array} Array of video source objects
 */
export const getVideoSources = () => {
  const sources = [];
  
  // Add Vercel Blob URL if available (prioritize in production)
  if (VIDEO_CONFIG.blob.primary) {
    sources.push({
      src: VIDEO_CONFIG.blob.primary,
      type: 'video/mp4',
      label: 'Vercel Blob (Primary)'
    });
  }
  
  // Add local sources (always available as fallback)
  sources.push({
    src: VIDEO_CONFIG.local.primary,
    type: 'video/mp4',
    label: 'Local Assets (Primary)'
  });
  
  // Add fallback sources
  VIDEO_CONFIG.local.fallbacks.forEach((src, index) => {
    sources.push({
      src,
      type: 'video/mp4',
      label: `Local Assets (Fallback ${index + 1})`
    });
  });
  
  return sources;
};

/**
 * Get download URL for the video
 * @returns {string} Download URL
 */
export const getDownloadUrl = () => {
  // Use Vercel Blob URL if available, otherwise use local
  if (VIDEO_CONFIG.blob.primary) {
    return VIDEO_CONFIG.blob.primary;
  }
  // Ensure we return the full path for local assets
  return VIDEO_CONFIG.local.primary;
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
