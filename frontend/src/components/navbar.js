import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ elements }) => {
  const location = useLocation();

  return (
    <header className="navbar flexbox">
      <ul>
        {elements.map((name, index) => (
          <li
            key={index}
            className={
              location.pathname.includes(name.replace(/\s/g, "-"))
                ? "nav-active"
                : ""
            }
          >
            <NavLink to={`/${name.replace(/\s/g, "-")}`}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

Navbar.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Navbar;
