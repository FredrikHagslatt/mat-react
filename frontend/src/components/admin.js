import React from 'react';
import { useAuth } from '../authcontext';
import Login from "./login";
import RecipeForm from "./recipe_form";


const Admin = () => {
    const { loggedIn } = useAuth();

    return (
        <div>
            {loggedIn ? (
                <RecipeForm />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Admin;