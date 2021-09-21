import '../css/myStyle.css';
import React, {Component} from 'react';


class Navbar extends Component {

    RenderNavbarElements(){
        return this.props.elements.map((name, key) =>
            (name === this.props.active ?
            <li key={key} className="active" onClick={ () => this.props.onClick(name)} >{name}</li>
            :<li key={key} onClick={ () => this.props.onClick(name)} >{name}</li>
            )
        );
    }

    render(){
        return(
            <header className="header-wrapper flexbox">
                <ul>
                    {this.RenderNavbarElements()}                       
                </ul>
            </header>
        );
    }

}export default Navbar;