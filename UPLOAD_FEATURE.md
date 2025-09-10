# Assignment Upload Feature

This feature allows students to submit their assignments for courses listed under the 'COURSES' tab in the Study page.

## Features

### 1. Text Entry Submission
- Students can type their assignment content directly in a text area
- Character count is displayed
- Content is saved as a text file and uploaded to Vercel Blob

### 2. PDF Upload Submission
- Students can upload PDF files (max 10MB)
- Drag and drop interface for easy file selection
- File validation ensures only PDF files are accepted
- Files are uploaded to Vercel Blob storage

### 3. Visual Feedback
- Course items show submission indicators when assignments are submitted
- Green highlighting and submission count badges
- Success/error messages during upload process
- Loading states during submission

## Technical Implementation

### Components
- `UploadModal.js` - Main upload interface component
- `uploadStorage.js` - Utility functions for handling uploads and storage
- `api/upload.js` - Vercel API route for file uploads

### Storage
- Uses Vercel Blob for file storage
- Local storage for submission tracking (development)
- Database integration ready for production

### File Structure
```
src/
├── components/
│   └── UploadModal.js
├── utils/
│   └── uploadStorage.js
├── pages/
│   └── Study.js (updated)
└── api/
    └── upload.js
```

## Usage

1. Navigate to the Study page
2. Click on the 'COURSES' tab
3. Click on any course item to open the upload modal
4. Choose between text entry or PDF upload
5. Fill in the content or select a file
6. Click 'Submit Assignment'

## Development vs Production

- **Development**: Simulates upload with local storage
- **Production**: Uses Vercel Blob for actual file storage

## Error Handling

- File type validation (PDF only)
- File size validation (10MB max)
- Network error handling
- User-friendly error messages
