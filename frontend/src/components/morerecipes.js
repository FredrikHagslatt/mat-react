import React, { Component } from "react";
import RecipePreview from "./recipe_preview";
import DBInterface from "./db_interface";

class MoreRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < props.widthSwitch,
      loadingRecipe: {
        name: "loading recipe",
        image: "",
        url: "",
      },
      recipes: [],
    };
  }

  componentDidMount() {
    Promise.resolve(DBInterface.GetMoreRecipes()).then((value) => {
      this.setState({ recipes: value });
    });
    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isMobile: window.innerWidth < this.props.widthSwitch,
        });
      },
      false
    );
  }

  render() {
    return (
      <div
        className={
          this.state.isMobile
            ? "flexbox more-recipes mobile"
            : "flexbox more-recipes"
        }
      >
        {this.state.recipes.map((recipe, index) => (
          <div
            className="item center-text backplate preview-padding"
            key={index}
          >
            <h3>{recipe.name}</h3>
            <RecipePreview
              recipe={
                typeof recipe === "object" ? recipe : this.state.loadingRecipe
              }
            />
          </div>
        ))}
      </div>
    );
  }
}
export default MoreRecipes;
