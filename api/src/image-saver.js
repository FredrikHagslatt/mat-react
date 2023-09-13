const path = require("path");
const fs = require("fs");

const storageDirectory = path.join(__dirname, "../assets/images/");
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}

function saveImage(imageFile) {
  if (!imageFile) {
    return null;
  }
  const uniqueFilename = `${Date.now()}-${imageFile.originalname}`;

  // Move the uploaded file to the storage directory
  const storagePath = path.join(storageDirectory, uniqueFilename);
  fs.copyFileSync(imageFile.path, storagePath);
  fs.unlinkSync(imageFile.path);

  return uniqueFilename;
}

module.exports = saveImage;
