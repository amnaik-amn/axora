// Simple video storage utility - only uses VR_Walkthrough_Universal.mp4

/**
 * Get video sources - simplified to only use one video file
 * @returns {Array} Array with single video source
 */
export const getVideoSources = () => {
  return [
    {
      src: '/assets/VR_Walkthrough_Universal.mp4',
      type: 'video/mp4',
      label: 'VR Walkthrough Universal'
    }
  ];
};

/**
 * Get download URL for the video
 * @returns {string} Download URL
 */
export const getDownloadUrl = () => {
  return '/assets/VR_Walkthrough_Universal.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'VR_Walkthrough_Universal.mp4';
};
