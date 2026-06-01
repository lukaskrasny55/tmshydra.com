const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();

  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      inputDir,
      path.basename(file, ext) + '.webp'
    );

    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Converted: ${file}`);
      })
      .catch(err => {
        console.error(err);
      });
  }
});