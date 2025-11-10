#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script helps identify large images that need optimization.
 * 
 * To compress images:
 * 1. Use online tools like TinyPNG (https://tinypng.com/)
 * 2. Use sharp CLI: npm install -g sharp-cli && sharp -i input.webp -o output.webp --webp
 * 3. Use Next.js Image component which automatically optimizes on-the-fly
 * 
 * Run this script: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const maxSizeKB = 500; // 500KB threshold

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / 1024;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  const largeImages = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      largeImages.push(...scanDirectory(filePath));
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
      const sizeKB = getFileSizeInKB(filePath);
      if (sizeKB > maxSizeKB) {
        largeImages.push({
          path: filePath.replace(publicDir, ''),
          sizeKB: sizeKB.toFixed(2),
          sizeMB: (sizeKB / 1024).toFixed(2)
        });
      }
    }
  });

  return largeImages;
}

console.log('🔍 Scanning for large images...\n');

const largeImages = scanDirectory(publicDir);

if (largeImages.length === 0) {
  console.log('✅ All images are under 500KB!');
} else {
  console.log(`⚠️  Found ${largeImages.length} large image(s):\n`);
  largeImages.forEach(img => {
    console.log(`📸 ${img.path}`);
    console.log(`   Size: ${img.sizeKB} KB (${img.sizeMB} MB)`);
    console.log('');
  });
  
  console.log('\n💡 Recommendations:');
  console.log('1. Compress images using TinyPNG: https://tinypng.com/');
  console.log('2. Use Next.js Image component (already done in code)');
  console.log('3. Convert to WebP/AVIF format for better compression');
  console.log('4. Resize images to appropriate dimensions');
}
