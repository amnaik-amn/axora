#!/usr/bin/env node

/**
 * Test Vercel Blob Token
 * This script tests if your blob token is working correctly
 */

const { list } = require('@vercel/blob');

async function testBlobToken() {
  try {
    console.log('🔑 Testing Vercel Blob Token...\n');
    
    // Check if token is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('❌ BLOB_READ_WRITE_TOKEN not found in environment');
      console.log('💡 Set it with: export BLOB_READ_WRITE_TOKEN=your_token');
      return;
    }
    
    console.log('✅ Token found in environment');
    console.log('🔍 Token starts with:', process.env.BLOB_READ_WRITE_TOKEN.substring(0, 8) + '...');
    
    console.log('\n📡 Testing connection to Vercel Blob...');
    
    // Try to list blobs (this tests read access)
    const { blobs } = await list();
    
    console.log('✅ Successfully connected to Vercel Blob!');
    console.log(`📊 Found ${blobs.length} existing blobs`);
    
    if (blobs.length > 0) {
      console.log('\n📁 Existing blobs:');
      blobs.forEach((blob, index) => {
        console.log(`  ${index + 1}. ${blob.pathname} (${blob.size} bytes)`);
      });
    }
    
    console.log('\n🎉 Your blob token is working correctly!');
    console.log('🚀 You can now run: node scripts/upload-to-blob.js');
    
  } catch (error) {
    console.error('\n❌ Blob token test failed:', error.message);
    
    if (error.message.includes('Access denied')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure you created a token with "Blob" scope');
      console.log('2. Check that the token value is correct');
      console.log('3. Ensure the token hasn\'t expired');
      console.log('4. Try creating a new token');
    }
    
    if (error.message.includes('Invalid token')) {
      console.log('\n🔧 Issue: Invalid token format');
      console.log('1. Copy the token exactly as shown in Vercel');
      console.log('2. Don\'t add extra spaces or characters');
      console.log('3. Make sure you\'re using the latest token');
    }
  }
}

// Run the test
testBlobToken();
