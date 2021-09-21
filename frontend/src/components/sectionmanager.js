import DinnerMenu from "./dinnermenu";
import MoreRecipes from "./morerecipes";
import Admin from "./admin";
import React, {Component} from 'react';
import DBFetcher from './dbfetcher';

class SectionManager extends Component {
    constructor(props){
        super(props);
        this.db = new DBFetcher();
    }

    ClickItem(url){
        console.log('Triggered!');
        alert(url);
    }

    GetSection(){
        if(this.props.active === 'Middagsmeny'){
            return<DinnerMenu 
                widthSwitch={this.props.widthSwitch} 
                db={this.db}/>;

        }else if(this.props.active === 'Fler recept'){
            return<MoreRecipes 
                widthSwitch={this.props.widthSwitch} 
                db={this.db}/>;

        }else{
            return<Admin />;
        }
    }

    render(){
        return <div className="content-wrapper flexbox">{this.GetSection()}</div>;
    }

}export default SectionManager;