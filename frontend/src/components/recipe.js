import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import DBInterface from "./db_interface";
import RecipeImage from "./recipe_image";

function Recipe() {
  const { recipeName } = useParams();
  const [image, setImage] = useState("default.jpg");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await DBInterface.GetRecipeByName(recipeName);

        setImage(data.image);
        setIngredients(data.ingredients);

        const processedDescription = data.description.replace(/\r\n/g, "<br>");
        setDescription(processedDescription);
      } catch (error) {
        console.error("Request failed:", error);
      }
    }

    fetchRecipe();
  }, [recipeName]);

  return (
    <div className="recipe desc">
      <div className="preview-padding backplate center-text">
        <h1>{recipeName}</h1>
        <RecipeImage
          src={process.env.PUBLIC_URL + "/assets/images/" + image}
          recipeName={recipeName}
        />
      </div>

      <div className="backplate center-text">
        <h2>Ingredienser</h2>
        <div className="center-content">
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <div className="ingredient-unit">
                  {ingredient[1]} {ingredient[2]}
                </div>
                <div className="ingredient-name">{ingredient[0]}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="backplate center-text">
        <h2>Gör så här</h2>
        {ReactHtmlParser(description)}
      </div>
    </div>
  );
}

export default Recipe;
