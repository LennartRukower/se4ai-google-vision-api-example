const fs = require('fs');
const path = require('path');

const getImageFilenames = (folderPath) => {
  // Read the folder contents
  const files = fs.readdirSync(folderPath);

  // Filter the files to only include image files
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif'].includes(ext);
  });

  return imageFiles;
}

module.exports = getImageFilenames;