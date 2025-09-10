// Upload storage utility - Vercel Blob integration for assignments

/**
 * Upload text content to Vercel Blob
 * @param {string} content - Text content to upload
 * @param {string} fileName - Name for the file
 * @returns {Promise<Object>} Upload result with URL
 */
export const uploadTextToBlob = async (content, fileName) => {
    try {
      // Create a Blob from the text content
      const textBlob = new Blob([content], { type: 'text/plain' });
      
      // Create FormData for the upload
      const formData = new FormData();
      formData.append('file', textBlob, fileName);
      
      // Upload to Vercel Blob via API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      return {
        success: true,
        url: result.url,
        fileName: result.fileName,
      };
    } catch (error) {
      console.error('Text upload error:', error);
      throw new Error(`Failed to upload text: ${error.message}`);
    }
  };
  
  /**
   * Upload PDF file to Vercel Blob
   * @param {File} file - PDF file to upload
   * @returns {Promise<Object>} Upload result with URL
   */
  export const uploadPDFToBlob = async (file) => {
    try {
      // Create FormData for the upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload to Vercel Blob via API route
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      return {
        success: true,
        url: result.url,
        fileName: result.fileName,
      };
    } catch (error) {
      console.error('PDF upload error:', error);
      throw new Error(`Failed to upload PDF: ${error.message}`);
    }
  };
  
  /**
   * Upload assignment submission (handles both text and PDF)
   * @param {Object} submissionData - Submission data object
   * @returns {Promise<Object>} Upload result
   */
  export const uploadAssignment = async (submissionData) => {
    const { uploadType, content, file, fileName, courseTitle, timestamp } = submissionData;
    
    try {
      let uploadResult;
      
      // For development/testing, we'll simulate the upload and store locally
      // In production, this would upload to Vercel Blob
      if (process.env.NODE_ENV === 'development') {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        uploadResult = {
          success: true,
          url: `https://example.com/uploads/${Date.now()}_${fileName}`,
          fileName: fileName,
        };
      } else {
        // Production upload to Vercel Blob
        if (uploadType === 'text') {
          uploadResult = await uploadTextToBlob(content, fileName);
        } else {
          uploadResult = await uploadPDFToBlob(file);
        }
      }
      
      // Create submission record
      const submission = {
        id: Date.now().toString(),
        courseTitle,
        uploadType,
        fileName: uploadResult.fileName,
        fileUrl: uploadResult.url,
        timestamp,
        status: 'submitted',
      };
      
      // Store submission record in localStorage (in a real app, this would go to a database)
      const existingSubmissions = JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('assignmentSubmissions', JSON.stringify(existingSubmissions));
      
      return {
        success: true,
        submission,
        message: 'Assignment submitted successfully!',
      };
    } catch (error) {
      console.error('Assignment upload error:', error);
      throw new Error(`Failed to submit assignment: ${error.message}`);
    }
  };
  
  /**
   * Get all assignment submissions for a course
   * @param {string} courseTitle - Course title to filter by
   * @returns {Array} Array of submissions
   */
  export const getCourseSubmissions = (courseTitle) => {
    const allSubmissions = JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
    return allSubmissions.filter(submission => 
      submission.courseTitle === courseTitle
    );
  };
  
  /**
   * Get all assignment submissions
   * @returns {Array} Array of all submissions
   */
  export const getAllSubmissions = () => {
    return JSON.parse(localStorage.getItem('assignmentSubmissions') || '[]');
  };
  