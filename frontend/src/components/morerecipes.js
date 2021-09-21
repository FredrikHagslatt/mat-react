import '../css/myStyle.css';
import React, {Component} from 'react';
import Recipe from './recipe';

class MoreRecipes extends Component {
    constructor(props){
        super(props);
        this.state={
            isMobile: window.innerWidth < props.widthSwitch,
            showImg: true,
            loadingRecipe: {
                'name': 'loading recipe',
                'image': '',
                'url': '',
            },
            recipes: [],
        }
    }

    RenderItems(){
        return this.state.recipes.map((recipe, key) => 
            (typeof recipe === 'object') ?
                <Recipe key={key} showImg={this.state.showImg} recipe={recipe}/>
                :<Recipe key={key} showImg={this.state.showImg} recipe={this.state.loadingRecipe}/>
        )
    }
       
    componentDidMount() {
        Promise.resolve(this.props.db.GetMoreRecipes())
        .then((value) => {
            this.setState({ recipes: JSON.parse(value) })
        })
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < this.props.widthSwitch
            });
        }, false);
    }

    render(){
        const classes = this.state.isMobile ? 'flexbox more-recipes mobile' : 'flexbox more-recipes';
        return(
            <div className={classes}>
                {this.RenderItems()}
            </div>
        );
    }
}export default MoreRecipes;