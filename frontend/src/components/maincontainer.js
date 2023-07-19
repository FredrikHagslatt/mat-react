import '../css/myStyle.css';
import React, { Component } from 'react';
import Navbar from './navbar';
import SectionManager from './sectionmanager';
import Footer from './footer';

const WIDTH_SWITCH = 800;
const sections = [
    'Middagsmeny',
    'Fler recept',
    'Admin',
];

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            activeSection: 'Middagsmeny',
            showImages: false,
        }
    }

    handleNavbarClick = (name) => {
        this.setState({ activeSection: name })
    }

    render() {
        const { activeSection, showImages } = this.state;

        return (
            <div className="window-size background-image">
                <Navbar
                    sections={sections}
                    activeSection={activeSection}
                    onClick={this.handleNavbarClick}
                />
                <SectionManager
                    activeSection={activeSection}
                    showImages={showImages}
                    widthSwitch={WIDTH_SWITCH}
                />
                <Footer />
            </div>
        );
    };
} export default MainContainer;