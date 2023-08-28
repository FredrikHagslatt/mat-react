import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import DinnerMenu from "./dinnermenu";
import MoreRecipes from "./morerecipes";
import Admin from "./admin";
import Recipe from "./recipe";

const SectionManager = ({ widthSwitch }) => {
  return (
    <div className="content-wrapper flexbox">
      <Routes>
        <Route path="/" element={<DinnerMenu widthSwitch={widthSwitch} />} />
        <Route
          path="/Middagsmeny"
          element={<DinnerMenu widthSwitch={widthSwitch} />}
        />
        <Route
          path="/Fler-recept"
          element={<MoreRecipes widthSwitch={widthSwitch} />}
        />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/recept/:recipeName" element={<Recipe />} />
      </Routes>
    </div>
  );
};

SectionManager.propTypes = {
  widthSwitch: PropTypes.number.isRequired,
};

export default SectionManager;
