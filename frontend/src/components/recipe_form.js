import '../css/myStyle.css';
import '../css/switch.css';

import React, { useState } from 'react';
import IngredientForm from './ingredient_form';

const FormInput = ({ value, placeholder, onChange }) => {
    return (
        <div>
            <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

const TextAreaInput = ({ value, onChange, placeholder }) => {
    const [textareaHeight, setTextareaHeight] = useState('auto');

    const handleTextareaChange = (event) => {
        const { scrollHeight, clientHeight } = event.target;
        setTextareaHeight(scrollHeight > clientHeight ? scrollHeight : 'auto');
        onChange(event);
    };

    return (
        <div>
            <textarea
                value={value}
                onChange={handleTextareaChange}
                placeholder={placeholder}
                style={{ height: textareaHeight }}
            />
        </div>
    );
};

const Switch = ({ checked, onChange, stateDisplay }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange(newState);
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={handleToggle} />
            <span className="slider"></span>
            <span className="state-text">{stateDisplay}</span>
        </label>
    );
};

const RecipeForm = () => {

    const FormType = {
        Internal: 'Internal',
        External: 'External',
    };

    const [name, setName] = useState('');
    const [type, setType] = useState(FormType.Internal);
    const [url, setUrl] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(type === FormType.Internal ? FormType.External : FormType.Internal);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleIngredientChange = (ingredientList) => {
        setIngredients(ingredientList);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log("Name: " + name + ", URL: " + url + ".")
        console.log("Ingredients" + ingredients + ".")
        console.log("Description: " + description + ".")
        event.preventDefault();
        // Perform form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
            />

            <Switch
                checked={type === FormType.External}
                onChange={handleTypeChange}
                stateDisplay={type} />

            {type === FormType.External ?
                <FormInput
                    placeholder="URL"
                    value={url}
                    onChange={handleUrlChange}
                />
                : null}

            {type === FormType.Internal ?
                <IngredientForm
                    onIngredientChange={handleIngredientChange}
                />
                : null}

            {type === FormType.Internal ?
                <TextAreaInput
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                : null}

            <button type="submit">Submit</button>
        </form>
    );

};

export default RecipeForm;