#!/usr/bin/env node

/**
 * Generate PNG Icons from SVG
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'icon.svg');
const publicDir = path.join(__dirname, 'public');

async function generateIcons() {
  try {
    const svg = fs.readFileSync(svgPath);

    // Generate 192x192
    await sharp(svg)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-192x192.png'));
    console.log('✅ Generated: icon-192x192.png');

    // Generate 512x512
    await sharp(svg)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-512x512.png'));
    console.log('✅ Generated: icon-512x512.png');

    // Generate maskable icons
    await sharp(svg)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-192x192-maskable.png'));
    console.log('✅ Generated: icon-192x192-maskable.png');

    await sharp(svg)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(publicDir, 'icon-512x512-maskable.png'));
    console.log('✅ Generated: icon-512x512-maskable.png');

    console.log('\n✨ All PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
