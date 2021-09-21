import '../css/myStyle.css';
import React, {Component} from 'react';
import DinnerMenuRecipe from './dinnermenurecipe';

class DinnerMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            isMobile: window.innerWidth < props.widthSwitch,
            loadingRecipe: {
                'name': 'loading recipe',
                'image': '',
                'url': '',
            },
            dinnerMenu: [],
            days: [],
        }
    }

    RenderItem(day, recipe){
        if(typeof recipe === 'object'){
            return <DinnerMenuRecipe day={day} recipe={recipe}/>
        }else{
            return <DinnerMenuRecipe day={day} recipe={this.state.loadingRecipe}/>
        }
    }

    SetDays(){
        const week = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
        var today = new Date().getDay();
        var days = [];
        for(var i = 0; i < 3; i++){
            days.push(week[(today + i) % 7]);
        }
        this.setState({days: days});
    }

    componentDidMount() {
        this.SetDays();
        Promise.resolve(this.props.db.GetDinnerMenu())
        .then((value) => {
            this.setState({ dinnerMenu: JSON.parse(value) })
        })

        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < this.props.widthSwitch,
            });
        }, false);
    }

    render(){
        const classes = this.state.isMobile ? 'flexbox dinner-menu mobile' : 'flexbox dinner-menu';
        return(
            <div className={classes}>
                {this.RenderItem(this.state.days[0], this.state.dinnerMenu[0])}
                {this.RenderItem(this.state.days[1], this.state.dinnerMenu[1])}
                {this.RenderItem(this.state.days[2], this.state.dinnerMenu[2])}

            </div>
        );
    }

}export default DinnerMenu;