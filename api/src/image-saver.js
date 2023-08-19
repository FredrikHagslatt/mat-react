const path = require("path");
const fs = require("fs");

const images_path = "/assets/images/";
const storageDirectory = path.join(__dirname, "../" + images_path);
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}

function saveImage(imageFile) {
  // Generate a unique filename

  if (!imageFile) {
    return null;
  }
  const uniqueFilename = `${Date.now()}-${imageFile.originalname}`;

  // Move the uploaded file to the storage directory
  const storagePath = path.join(storageDirectory, uniqueFilename);
  fs.renameSync(imageFile.path, storagePath);

  return uniqueFilename;
}

module.exports = saveImage;
