const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = './public/images';

function compressImages(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      compressImages(filePath);
    } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const sizeMB = stat.size / (1024 * 1024);
      
      if (sizeMB > 0.3) {
        console.log(`Compressing ${file} (${sizeMB.toFixed(2)}MB)...`);
        
        if (file.endsWith('.png')) {
          sharp(filePath)
            .png({ quality: 80, progressive: true })
            .toFile(filePath + '.tmp', (err, info) => {
              if (!err) {
                fs.renameSync(filePath + '.tmp', filePath);
                console.log(`✓ Compressed ${file}`);
              } else {
                console.error(`✗ Failed to compress ${file}:`, err);
              }
            });
        } else {
          sharp(filePath)
            .jpeg({ quality: 80, progressive: true })
            .toFile(filePath + '.tmp', (err, info) => {
              if (!err) {
                fs.renameSync(filePath + '.tmp', filePath);
                console.log(`✓ Compressed ${file}`);
              } else {
                console.error(`✗ Failed to compress ${file}:`, err);
              }
            });
        }
      }
    }
  });
}

compressImages(imagesDir);
console.log('Compression started...');
