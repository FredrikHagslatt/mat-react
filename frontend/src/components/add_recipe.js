import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',

            type: 'Internal',

            ingredientName: '',
            ingredientQuantity: 0,
            ingredientUnit: '',

            ingredients: [],
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeURL = this.handleChangeURL.bind(this);
        this.handleChangeIngredientName = this.handleChangeIngredientName.bind(this);
        this.handleChangeIngredientQuantity = this.handleChangeIngredientQuantity.bind(this);
        this.handleChangeIngredientUnit = this.handleChangeIngredientUnit.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeURL(event) {
        this.setState({ url: event.target.value });
    }

    handleChangeIngredientName(event) {
        this.setState({ ingredientName: event.target.value });
    }

    handleChangeIngredientQuantity(event) {
        this.setState({ ingredientQuantity: event.target.value });
    }

    handleChangeIngredientUnit(event) {
        this.setState({ ingredientUnit: event.target.value });
    }

    handleAddIngredient(event) {
        console.log(this.state.ingredientName, this.state.ingredientQuantity, this.state.ingredientUnit);
    }

    /*
    handleToggleType(event) {
        this.setState({ type: this.state.type === 'Internal' ? 'External' : 'Internal' });
    }
    */

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        alert(this.state.url);
    }

    RenderNameInput() {
        return (
            <label>
                Name: <input type="text" value={this.state.name} onChange={this.handleChangeName} />
            </label>
        );
    }

    RenderTypeSwitch() {
        return (
            <div>
                <p> Source:
                    <Switch
                        onChange={this.handleToggleType}
                        checked={this.state.type === 'Internal'}
                        checkedIcon={this.state.type}
                        uncheckedIcon={this.state.type}
                    />
                </p>
            </div>
        );
    }

    RenderDescription() { }

    RenderIngredientInGrid(col) {
    }

    RenderUrlInput() {
        return (
            <label>
                URL: <input type="text" value={this.state.url} onChange={this.handleChangeURL} />
            </label>
        );
    }

    RenderIngredients() {
        return (
            <div>
                <div>
                    <p>name</p><p>quantity</p><p>unit</p>
                </div>
                <form onSubmit={this.handleAddIngredient}>
                    <input type="text" value={this.state.ingredientName} onChange={this.handleChangeIngredientName} />
                    <input type="text" value={this.state.ingredientQuantity} onChange={this.handleChangeIngredientQuantity} />
                    <input type="text" value={this.state.ingredientUnit} onChange={this.handleChangeIngredientUnit} />
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    };

    //{this.RenderTypeSwitch()}
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.RenderNameInput()}
                {this.state.type == 'Internal' ? this.RenderDescription() : null}
                {this.state.type == 'Internal' ? this.RenderIngredients() : null}
                {this.state.type == 'External' ? this.RenderUrlInput() : null}
                <input type="submit" value="Submit" />
            </form>
        );
    }

} export default AddRecipe;