import "../css/general.css";

function Recipe(props) {
  if (props.recipe.image === "") {
    props.recipe.image = "default.jpg";
  }
  if (props.showImg === true) {
    return (
      <a href={props.recipe.url || "#"} className="item">
        <div className="desc">
          <h3>{props.day}</h3>
          <p>{props.recipe.name}</p>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/assets/images/" + props.recipe.image}
          alt={props.recipe.name}
        />
      </a>
    );
  } else {
    return (
      <a href={props.recipe.url} className="item">
        <div className="desc">
          <p>{props.recipe.name}</p>
        </div>
      </a>
    );
  }
}
export default Recipe;
