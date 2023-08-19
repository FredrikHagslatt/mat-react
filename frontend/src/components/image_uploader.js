import React, { useState } from "react";

const ImageUploader = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    onImageSelected(imageFile);
  };

  return (
    <div>
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
      )}
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};
//style={{ maxWidth: `${maxWidth}px` }}

export default ImageUploader;
