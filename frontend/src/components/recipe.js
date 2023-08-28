import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DBInterface from "./db_interface";

function Recipe() {
  const { recipeName } = useParams();
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [image, setImage] = useState("default.jpg");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await DBInterface.GetRecipeByName(recipeName);
        console.log(data);

        setId(data.id);
        setImage(data.image);

        setDescription(data.description);

        setIngredients(data.ingredients);
      } catch (error) {
        console.error("Request failed:", error);
        setError("Failed to fetch data");
      }
    }

    fetchRecipe();
  }, [recipeName]);

  return (
    <div className="recipe.style">
      <h1>{recipeName}</h1>
      <img
        src={process.env.PUBLIC_URL + "/assets/images/" + image}
        alt={image}
      />
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ol>
      <p>{description}</p>
    </div>
  );
}

export default Recipe;
