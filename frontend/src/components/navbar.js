import React from 'react';
import PropTypes from 'prop-types';
import '../css/myStyle.css';

const Navbar = ({ sections, activeSection, onClick }) => {
    const renderNavbarElements = () => {
        return sections.map((name, index) => (
            <li
                key={index}
                className={name === activeSection ? 'active' : ''}
                onClick={() => onClick(name)}
            >
                {name}
            </li>
        ));
    };

    return (
        <header className="header-wrapper flexbox">
            <ul>{renderNavbarElements()}</ul>
        </header>
    );
};

Navbar.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeSection: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Navbar;
