import React, { useState, useRef, useEffect } from 'react';


const IngredientForm = ({ onIngredientChange }) => {
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const ingredientNameRefs = useRef([]);

    useEffect(() => {
        if (ingredientNameRefs.current.length > 0) {
            const lastIngredientNameRef = ingredientNameRefs.current[ingredientNameRefs.current.length - 1];
            if (lastIngredientNameRef) {
                lastIngredientNameRef.focus();
            }
        }
    }, [ingredients.length]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newIngredients = [...ingredients];
        newIngredients[index][name] = value;
        setIngredients(newIngredients);
        onIngredientChange(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddIngredient();
        }
    };

    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Ingredient"
                        ref={(element) => (ingredientNameRefs.current[index] = element)}
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Quantity"
                    />
                    <input
                        type="text"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Unit"
                        onKeyUp={handleKeyPress}
                    />
                    {ingredients.length > 1 && (
                        <button type="button" onClick={() => handleRemoveIngredient(index)}>
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
            </button>
        </div>
    );


};


export default IngredientForm;
