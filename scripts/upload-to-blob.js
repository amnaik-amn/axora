#!/usr/bin/env node

/**
 * Upload video to Vercel Blob storage
 * This script uploads the video file to Vercel Blob and provides the URL
 * Run with: node scripts/upload-to-blob.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadVideo() {
  try {
    console.log('🚀 Starting Vercel Blob upload...');
    
    // Check if BLOB_READ_WRITE_TOKEN exists
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('⚠️  BLOB_READ_WRITE_TOKEN not found in environment variables');
      console.log('📋 To set up Vercel Blob:');
      console.log('1. Go to your Vercel project dashboard');
      console.log('2. Go to Settings > Environment Variables');
      console.log('3. Add BLOB_READ_WRITE_TOKEN with your blob token');
      console.log('4. Run: vercel env pull');
      return;
    }
    
    const videoPath = path.join(__dirname, '../public/assets/Ananya_Naik_Walkthrough_Final.mp4');
    
    // Check if video file exists
    if (!fs.existsSync(videoPath)) {
      console.error('❌ Video file not found:', videoPath);
      return;
    }
    
    console.log('📁 Reading video file:', videoPath);
    const videoBuffer = fs.readFileSync(videoPath);
    const fileSizeMB = (videoBuffer.length / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeMB} MB`);
    
    console.log('☁️  Uploading to Vercel Blob...');
    const blob = await put('ananya-naik-vr-walkthrough.mp4', videoBuffer, {
      access: 'public',
      contentType: 'video/mp4',
    });
    
    console.log('✅ Upload successful!');
    console.log('🔗 Blob URL:', blob.url);
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Copy the URL above');
    console.log('2. Update your environment variables with:');
    console.log(`   VERCEL_BLOB_VIDEO_URL=${blob.url}`);
    console.log('3. Redeploy your application');
    
    return blob.url;
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('- Ensure BLOB_READ_WRITE_TOKEN is set correctly');
    console.log('- Check your Vercel project permissions');
    console.log('- Verify the video file exists and is readable');
  }
}

// Run the upload if this script is called directly
if (require.main === module) {
  uploadVideo();
}

module.exports = { uploadVideo };
