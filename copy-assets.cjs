const fs = require('fs-extra');
const path = require('path');

async function copyAssets() {
  try {
    // Define source and destination directories
    const sourceImagesDir = path.join(__dirname, 'src/images');
    const sourceNDir = path.join(__dirname, 'src/n');
    const destinationDir = path.join(__dirname, 'dist');

    // Copy the 'images' and 'n' directories to 'dist'
    await fs.copy(sourceImagesDir, path.join(destinationDir, 'images'));
    await fs.copy(sourceNDir, path.join(destinationDir, 'n'));

    console.log('Assets copied successfully.');
  } catch (error) {
    console.error('Error copying assets:', error);
  }
}

copyAssets();
