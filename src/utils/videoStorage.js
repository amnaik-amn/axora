// Video storage utility - Vercel Blob integration

/**
 * Get video sources from Vercel Blob
 * @returns {Array} Array with video source
 */
export const getVideoSources = () => {
  return [
    {
      src: 'https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4',
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
  return 'https://qwivkuxikyjhmuzg.public.blob.vercel-storage.com/VR_Walkthrough_Universal.mp4';
};

/**
 * Get the filename for download
 * @returns {string} Filename for download
 */
export const getDownloadFilename = () => {
  return 'VR_Walkthrough_Universal.mp4';
};
