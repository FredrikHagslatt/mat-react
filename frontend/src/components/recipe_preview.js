function RecipePreview(props) {
  const { recipe } = props;

  if (recipe.image === null) {
    recipe.image = "default.jpg";
  }

  const recipeLink = `/recept/${recipe.name}`;

  return (
    <a href={recipeLink} className="item">
      <div className="desc">
        <h3>{props.day}</h3>
        <p>{recipe.name}</p>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/assets/images/" + props.recipe.image}
        alt={recipe.name}
      />
    </a>
  );
}

export default RecipePreview;
