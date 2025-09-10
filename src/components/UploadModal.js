import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, courseTitle, onSubmit }) => {
  const [uploadType, setUploadType] = useState('text'); // 'text' or 'pdf'
  const [textContent, setTextContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setErrorMessage('Please select a PDF file only.');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be less than 10MB.');
        return;
      }
      
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  const handleSubmit = async () => {
    if (uploadType === 'text' && !textContent.trim()) {
      setErrorMessage('Please enter some text content.');
      return;
    }
    
    if (uploadType === 'pdf' && !selectedFile) {
      setErrorMessage('Please select a PDF file.');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setUploadStatus(null);

    try {
      let submissionData = {
        courseTitle,
        uploadType,
        timestamp: new Date().toISOString(),
      };

      if (uploadType === 'text') {
        submissionData.content = textContent;
        submissionData.fileName = `${courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_text_submission.txt`;
      } else {
        submissionData.file = selectedFile;
        submissionData.fileName = selectedFile.name;
      }

      // Call the parent component's submit handler
      await onSubmit(submissionData);
      
      setUploadStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setTextContent('');
    setSelectedFile(null);
    setErrorMessage('');
    setUploadStatus(null);
    setIsUploading(false);
    onClose();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Please drop a PDF file only.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Submit Assignment</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Course Title */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Course:</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{courseTitle}</p>
          </div>

          {/* Upload Type Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Submission Type:</h4>
            <div className="flex gap-4">
              <button
                onClick={() => setUploadType('text')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  uploadType === 'text'
                    ? 'border-[#AC5757] bg-[#AC5757]/10 text-[#AC5757]'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <FileText size={20} />
                Text Entry
              </button>
              <button
                onClick={() => setUploadType('pdf')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  uploadType === 'pdf'
                    ? 'border-[#AC5757] bg-[#AC5757]/10 text-[#AC5757]'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Upload size={20} />
                PDF Upload
              </button>
            </div>
          </div>

          {/* Text Entry */}
          {uploadType === 'text' && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Text Submission:</h4>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your assignment content here..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#AC5757] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">
                Character count: {textContent.length}
              </p>
            </div>
          )}

          {/* PDF Upload */}
          {uploadType === 'pdf' && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">PDF Upload:</h4>
              <div
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  selectedFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="mx-auto text-green-500" size={48} />
                    <p className="text-green-600 font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto text-gray-400" size={48} />
                    <div>
                      <p className="text-gray-600 font-medium">Drop your PDF here</p>
                      <p className="text-gray-500 text-sm">or click to browse</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#AC5757] text-white px-6 py-2 rounded-lg hover:bg-[#8A4A4A] transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Maximum file size: 10MB. Only PDF files are accepted.
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {uploadStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <p className="text-green-700 text-sm">Assignment submitted successfully!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || (uploadType === 'text' && !textContent.trim()) || (uploadType === 'pdf' && !selectedFile)}
              className="px-6 py-2 bg-[#AC5757] text-white rounded-lg hover:bg-[#8A4A4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Assignment'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
