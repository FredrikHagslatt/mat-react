import '../css/myStyle.css';
import React, {Component} from 'react';
import Navbar from './navbar';
import SectionManager from './sectionmanager';
import Footer from './footer';

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            sections: [
                'Middagsmeny',
                'Fler recept', 
                'Admin',
            ],
            activeSection: 'Middagsmeny',
            showImages: false,
            widthSwitch: 800,
        }
    }

    NavbarClick = (name) => {
        this.setState({activeSection: name})
    }
    
    render(){
        return(            
            <div className="window-size background-image">
                    <Navbar
                        elements={this.state.sections} 
                        active={this.state.activeSection} 
                        onClick={this.NavbarClick}/>

                    <SectionManager 
                        active={this.state.activeSection}
                        showImages={this.state.showImages} 
                        widthSwitch={this.state.widthSwitch}/>

                    <Footer />

            </div>
        );
    };
} export default MainContainer;