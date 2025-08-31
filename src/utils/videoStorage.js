// Simple video storage utility - only uses Ananya_Naik_Walkthrough_Final.mp4

/**
 * Get video sources - simplified to only use one video file
 * @returns {Array} Array with single video source
 */
export const getVideoSources = () => {
  return [
    {
      src: '/assets/Ananya_Naik_Walkthrough_Final.mp4',
      type: 'video/mp4',
      label: 'Ananya Naik Walkthrough Final'
    }
  ];
};

/**
 * Get download URL for the video
 * @returns {string} Download URL
 */
export const getDownloadUrl = () => {
  return '/assets/Ananya_Naik_Walkthrough_Final.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'Ananya_Naik_Walkthrough_Final.mp4';
};
