import React from "react";

function RecipeImage({ src, recipeName }) {
  const handleImageError = (event) => {
    event.target.src = process.env.PUBLIC_URL + "/assets/images/default.jpg";
  };

  return (
    <div className="center-content">
      <div className="square-container">
        <img
          src={src}
          alt={recipeName}
          className="square-image"
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

export default RecipeImage;
