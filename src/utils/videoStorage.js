// Simple video storage utility - temporarily using test_video.mp4 for testing

/**
 * Get video sources - simplified to only use one video file
 * @returns {Array} Array with single video source
 */
export const getVideoSources = () => {
  return [
    {
      src: '/assets/test_video.mp4',
      type: 'video/mp4',
      label: 'Test Video'
    }
  ];
};

/**
 * Get download URL for the video
 * @returns {string} Download URL
 */
export const getDownloadUrl = () => {
  return '/assets/test_video.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'test_video.mp4';
};
