import React, { Component } from "react";
import RecipePreview from "./recipe_preview";
import DBInterface from "./db_interface";

class DinnerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < props.widthSwitch,
      loadingRecipe: {
        name: "loading recipe",
        image: "",
        url: "",
      },
      dinnerMenu: [],
      days: [],
    };
  }

  SetDays() {
    const week = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];
    const today = new Date().getDay();
    const days = [];
    for (var i = 0; i < 3; i++) {
      days.push(week[(today + i) % 7]);
    }
    this.setState({ days: days });
  }

  async componentDidMount() {
    this.SetDays();
    try {
      const dinnerMenu = await DBInterface.GetDinnerMenu();
      this.setState({ dinnerMenu });
    } catch (error) {
      console.error("Error fetching dinner menu:", error);
      // Handle the error or show an error message to the user
    }
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
    const { isMobile, days, dinnerMenu, loadingRecipe } = this.state;
    const classes = isMobile
      ? "flexbox dinner-menu mobile"
      : "flexbox dinner-menu";
    return (
      <div className={classes}>
        {dinnerMenu.map((recipe, index) => (
          <div
            className="item center-text backplate preview-padding"
            key={index}
          >
            <h2>{days[index]}</h2>
            <h3>{recipe.name}</h3>
            <RecipePreview
              recipe={typeof recipe === "object" ? recipe : loadingRecipe}
            />
          </div>
        ))}
      </div>
    );
  }
}
export default DinnerMenu;
