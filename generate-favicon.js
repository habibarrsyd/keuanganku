#!/usr/bin/env node

/**
 * Generate favicon
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'icon.svg');
const publicDir = path.join(__dirname, 'public');

async function generateFavicon() {
  try {
    const svg = fs.readFileSync(svgPath);

    // Generate favicon.ico (32x32)
    await sharp(svg)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    
    console.log('✅ Generated: favicon.png');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
