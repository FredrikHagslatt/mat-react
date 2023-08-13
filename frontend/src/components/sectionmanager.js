import "../css/general.css";

import React from "react";
import PropTypes from "prop-types";
import { Routes, Route } from "react-router-dom";
import DinnerMenu from "./dinnermenu";
import MoreRecipes from "./morerecipes";
import Admin from "./admin";

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
      </Routes>
    </div>
  );
};

SectionManager.propTypes = {
  widthSwitch: PropTypes.number.isRequired,
};

export default SectionManager;
