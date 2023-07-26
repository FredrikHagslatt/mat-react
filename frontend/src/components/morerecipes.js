import '../css/myStyle.css';
import React, { Component } from 'react';
import Recipe from './recipe';
import DBInterface from './db_interface';


class MoreRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: window.innerWidth < props.widthSwitch,
            showImg: true,
            loadingRecipe: {
                'name': 'loading recipe',
                'image': '',
                'url': '',
            },
            recipes: [],
        }
        this.HandleCheckbox = this.HandleCheckbox.bind(this);
    }

    HandleCheckbox(event) {
        this.setState({ showImg: !this.state.showImg });
    }

    RenderItems() {
        return this.state.recipes.map((recipe, key) =>
            (typeof recipe === 'object') ?
                <Recipe key={key} showImg={this.state.showImg} recipe={recipe} />
                : <Recipe key={key} showImg={this.state.showImg} recipe={this.state.loadingRecipe} />
        )
    }

    componentDidMount() {
        Promise.resolve(DBInterface.GetMoreRecipes())
            .then((value) => {
                this.setState({ recipes: value })
            })
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < this.props.widthSwitch
            });
        }, false);
    }

    render() {
        const classes = this.state.isMobile ? 'flexbox more-recipes mobile' : 'flexbox more-recipes';
        return (
            <div>

                <div>

                    <label className="images-checkbox">
                        <input
                            type="checkbox"
                            checked={this.state.showImg}
                            onChange={this.HandleCheckbox}
                        />
                        Visa bilder
                    </label>

                </div>
                <div className={classes}>

                    {this.RenderItems()}
                </div>
            </div>

        );
    }
} export default MoreRecipes;