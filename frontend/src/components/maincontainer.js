import "../css/general.css";
import React, { Component } from "react";
import Navbar from "./navbar";
import SectionManager from "./sectionmanager";
import Footer from "./footer";

const WIDTH_SWITCH = 800;

const sections = ["Middagsmeny", "Fler recept", "Admin"];

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="window-size background-image">
        <Navbar elements={sections} />
        <SectionManager widthSwitch={WIDTH_SWITCH} />
        <Footer />
      </div>
    );
  }
}
export default MainContainer;
