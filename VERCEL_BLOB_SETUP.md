# Vercel Blob Setup for Video Storage

This guide helps you set up Vercel Blob storage to fix the common issue where videos play locally but not on Vercel deployment.

## 🎯 Problem Solved
- Videos work on localhost but fail on Vercel
- Large video files cause deployment issues
- Inconsistent video serving between environments

## 📋 Setup Steps

### 1. Get Vercel Blob Token
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add: `BLOB_READ_WRITE_TOKEN` with your blob storage token

### 2. Upload Video to Blob Storage
```bash
# Make sure you have the token set
export BLOB_READ_WRITE_TOKEN=your_token_here

# Run the upload script
node scripts/upload-to-blob.js
```

### 3. Set Environment Variable
After upload, add the blob URL to your environment:
```bash
# Add to Vercel Environment Variables
VERCEL_BLOB_VIDEO_URL=https://your-blob-url.vercel-storage.app/file.mp4
```

### 4. Deploy
```bash
git add .
git commit -m "Add Vercel Blob support for video storage"
git push
```

## 🔄 How It Works

### Development (localhost)
- Uses local files from `/public/assets/`
- Fast loading and development

### Production (Vercel)
- Automatically uses Vercel Blob URLs
- Falls back to local assets if blob fails
- Ensures video always works

## 📁 Files Added
- `src/utils/videoStorage.js` - Smart video source management
- `scripts/upload-to-blob.js` - Upload utility
- Updated `VRLanding.js` - Uses dynamic video sources

## ✅ Benefits
- ✅ Videos work on both localhost and Vercel
- ✅ Automatic fallbacks prevent breaking
- ✅ No changes needed to existing functionality
- ✅ Better performance on production

## 🚨 Safety Features
- Multiple fallback sources
- Local assets still work if blob fails
- No breaking changes to existing code
- Environment-aware source selection
