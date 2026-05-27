#!/usr/bin/env node

/**
 * Generate PWA Icons
 * Creates 192x192 and 512x512 PNG icons for the PWA
 * 
 * Run: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Simple SVG icon (green square with rupiah symbol)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <style>
      .bg { fill: #4A6B5D; }
      .text { fill: #FBFBFA; font-size: 200px; font-weight: bold; font-family: Arial; text-anchor: middle; }
    </style>
  </defs>
  <rect class="bg" width="512" height="512"/>
  <text class="text" x="256" y="340">₹</text>
</svg>`;

// Save SVG
const svgPath = path.join(__dirname, 'public', 'icon.svg');
fs.writeFileSync(svgPath, svg);
console.log('✅ Created: public/icon.svg');

console.log('\n📝 To generate PNG icons from SVG, you have two options:\n');
console.log('Option 1: Use an online converter (quickest)');
console.log('  1. Go to: https://convertio.co/svg-png/');
console.log('  2. Upload: public/icon.svg');
console.log('  3. Download as PNG and save as:');
console.log('     - public/icon-192x192.png (scale to 192x192)');
console.log('     - public/icon-512x512.png (scale to 512x512)');
console.log('     - public/icon-192x192-maskable.png (same as 192x192)');
console.log('     - public/icon-512x512-maskable.png (same as 512x512)\n');

console.log('Option 2: Use sharp package locally');
console.log('  npm install sharp');
console.log('  node -e "');
console.log('    const sharp = require(\'sharp\');');
console.log('    const svg = require(\'fs\').readFileSync(\'public/icon.svg\');');
console.log('    sharp(svg).png().resize(192, 192).toFile(\'public/icon-192x192.png\');');
console.log('    sharp(svg).png().resize(512, 512).toFile(\'public/icon-512x512.png\');');
console.log('  "\n');

console.log('Option 3: Use ImageMagick');
console.log('  convert -density 300 -resize 192x192 public/icon.svg public/icon-192x192.png');
console.log('  convert -density 300 -resize 512x512 public/icon.svg public/icon-512x512.png\n');
