import React from "react";

const ExternalRecipe = ({ recipe }) => {
  return (
    <a href={recipe.url} className="item">
      <div className="desc">
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
      </div>
      {recipe.image && (
        <img
          src={process.env.PUBLIC_URL + "/images/recipes/" + recipe.image}
          alt={recipe.name}
        />
      )}
    </a>
  );
};

export default ExternalRecipe;
