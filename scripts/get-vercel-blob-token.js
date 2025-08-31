#!/usr/bin/env node

/**
 * Get Vercel Blob Token Setup Guide
 * This script helps you set up Vercel Blob storage
 */

console.log('🔑 Vercel Blob Token Setup Guide');
console.log('=====================================\n');

console.log('📋 Step 1: Get Your Blob Token');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your project (axora)');
console.log('3. Go to Settings → Environment Variables');
console.log('4. Click "Add New"');
console.log('5. Add: BLOB_READ_WRITE_TOKEN');
console.log('6. Get the token from: https://vercel.com/account/tokens');
console.log('   (Create new token with "Blob" scope)\n');

console.log('📋 Step 2: Set Environment Variable Locally');
console.log('1. Create .env.local file in your project root');
console.log('2. Add: BLOB_READ_WRITE_TOKEN=your_token_here');
console.log('3. Or run: export BLOB_READ_WRITE_TOKEN=your_token_here\n');

console.log('📋 Step 3: Upload Video to Blob Storage');
console.log('1. Make sure token is set');
console.log('2. Run: node scripts/upload-to-blob.js');
console.log('3. Copy the returned URL\n');

console.log('📋 Step 4: Set Blob URL in Vercel');
console.log('1. Go back to Vercel Environment Variables');
console.log('2. Add: REACT_APP_VERCEL_BLOB_VIDEO_URL');
console.log('3. Set value to the URL from step 3\n');

console.log('📋 Step 5: Deploy');
console.log('1. Commit and push your changes');
console.log('2. Vercel will auto-deploy');
console.log('3. Videos will work on both localhost and Vercel!\n');

console.log('🔗 Useful Links:');
console.log('- Vercel Dashboard: https://vercel.com/dashboard');
console.log('- Blob Documentation: https://vercel.com/docs/storage/vercel-blob');
console.log('- Environment Variables: https://vercel.com/docs/projects/environment-variables\n');

console.log('❓ Need Help?');
console.log('- Check VERCEL_BLOB_SETUP.md for detailed instructions');
console.log('- Vercel Support: https://vercel.com/support');
