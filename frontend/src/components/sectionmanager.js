import React from 'react';
import PropTypes from 'prop-types';
import '../css/myStyle.css';
import DinnerMenu from "./dinnermenu";
import MoreRecipes from "./morerecipes";
import Admin from "./admin";

const SectionManager = ({ activeSection, widthSwitch }) => {
    const renderSection = () => {
        if (activeSection === 'Middagsmeny') {
            return <DinnerMenu widthSwitch={widthSwitch} />;
        } else if (activeSection === 'Fler recept') {
            return <MoreRecipes widthSwitch={widthSwitch} />;
        } else {
            return <Admin />;
        }
    };

    return <div className="content-wrapper flexbox">{renderSection()}</div>;
};

SectionManager.propTypes = {
    activeSection: PropTypes.string.isRequired,
    widthSwitch: PropTypes.number.isRequired,
};

export default SectionManager;
