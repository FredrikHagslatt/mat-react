import React, {Component} from 'react';
import Password from "./password";

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            url: true,

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

    handleChangeURL(event){
        this.setState({ url: event.target.value});
    }

    handleChangeIngredientName(event){
        this.setState({ ingredientName: event.target.value});
    }

    handleChangeIngredientQuantity(event){
        this.setState({ ingredientQuantity: event.target.value});
    }

    handleChangeIngredientUnit(event){
        this.setState({ ingredientUnit: event.target.value});
    }

    handleAddIngredient(event){
        console.log(this.state.ingredientName, this.state.ingredientQuantity, this.state.ingredientUnit);
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.name);
        alert(this.state.url);
    }

    RenderNameInput(){
        return(
            <label>
                Name:<input type="text" value={this.state.name} onChange={this.handleChangeName} />
            </label>
        );
    }

    RenderURLButtons(){
        return(
            <div onChange={this.handleChangeURL}>
                <p> URL?      
                <input type="radio" value='true' name="url" checked/> Yes
                <input type="radio" value='0' name="url" /> No
                </p>
            </div>
        );
    }

    RenderDescription(){}

    RenderIngredientInGrid(col){
    }    

    RenderIngredients(){
        return(
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

    render(){
        let loggedIn = false;
        if(loggedIn){
            return(
                <form onSubmit={this.handleSubmit}>
                    {this.RenderNameInput()}
                    {this.RenderURLButtons()}
                    {this.RenderDescription()}
                    {this.RenderIngredients()}
                    <input type="submit" value="Submit" />
                </form>
            );    
        }else{
            return<Password />;
        }

    }

}export default Admin;