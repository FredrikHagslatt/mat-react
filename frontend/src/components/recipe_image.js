import React from "react";

function RecipeImage({ src, recipeName }) {
  return (
    <div className="center-content">
      <div className="square-container">
        <img src={src} alt={recipeName} className="square-image" />
      </div>
    </div>
  );
}

export default RecipeImage;
