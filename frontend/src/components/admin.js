import React, { Component } from 'react';
import Password from "./password";
import RecipeForm from "./recipe_form";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
        };
    }

    render() {
        if (this.state.loggedIn) {
            return <RecipeForm />;
        } else {
            return <Password />;
        }
    }

} export default Admin;