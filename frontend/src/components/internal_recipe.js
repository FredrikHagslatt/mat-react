import React from 'react';

const InternalRecipe = ({ recipe }) => {
    return (
        <div>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default InternalRecipe;
