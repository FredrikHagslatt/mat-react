import RecipeImage from "./recipe_image";

function RecipePreview(props) {
  const { recipe } = props;

  if (recipe.image === null) {
    recipe.image = "default.jpg";
  }

  const recipeLink =
    recipe.type === "External" ? recipe.url : `/recept/${recipe.name}`;

  return (
    <a href={recipeLink || "#"}>
      <RecipeImage
        src={process.env.PUBLIC_URL + "/assets/images/" + recipe.image}
        recipeName={recipe.name}
      />
    </a>
  );
}

export default RecipePreview;
