import React, { useEffect, useState } from "react";
import IngredientForm from "./ingredient_form";
import DBInterface from "./db_interface";
import ImageUploader from "./image_uploader";

const FormInput = ({ value, placeholder, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="dark"
      />
    </div>
  );
};

const TextAreaInput = ({ value, onChange, placeholder }) => {
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleTextareaChange = (event) => {
    const { scrollHeight, clientHeight } = event.target;
    setTextareaHeight(scrollHeight > clientHeight ? scrollHeight : "auto");
    onChange(event);
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={handleTextareaChange}
        placeholder={placeholder}
        className="dark description-textarea"
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
      <span className="dark slider"></span>
      <span className="state-text">{stateDisplay}</span>
    </label>
  );
};

const RecipeForm = () => {
  const FormType = {
    Internal: "Internal",
    External: "External",
  };

  const [name, setName] = useState("");
  const [type, setType] = useState(FormType.Internal);
  const [url, setUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingNames, setExistingNames] = useState([]);
  const [nameTaken, setNameTaken] = useState(false);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const names = await DBInterface.GetRecipeNames();
        setExistingNames(names);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching existing names:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array ensures this effect runs once on mount

  const handleNameChange = (event) => {
    setNameTaken(existingNames.has(event.target.value));
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

  const handleKeyDown = (event) => {
    const { tagName } = event.target;
    // Prevent form submission on enter key press
    // Enter will create new lines in textareas
    if (event.key === "Enter" && tagName !== "TEXTAREA") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (existingNames.has(name)) {
      alert("Name already taken!\nRecipe not added.");
    }

    try {
      if (type === FormType.External) {
        await DBInterface.addExternalRecipe(name, url, image);
      } else {
        await DBInterface.addInternalRecipe(
          name,
          description,
          ingredients,
          image
        );
      }

      // Show a success message to the user if the request is successful
      alert("Recipe added successfully!");
    } catch (error) {
      // Handle the error
      if (error.message === "Failed to add external recipe") {
        alert("Error adding external recipe");
      } else if (error.message === "Recipe name already exists") {
        alert("Recipe name already exists. Please choose a different name.");
      } else {
        alert("An unknown error occurred");
      }
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <FormInput placeholder="Name" value={name} onChange={handleNameChange} />
      {nameTaken ? <p className="form-error">Name already taken</p> : null}

      <Switch
        checked={type === FormType.External}
        onChange={handleTypeChange}
        stateDisplay={type}
      />

      {type === FormType.External ? (
        <FormInput placeholder="URL" value={url} onChange={handleUrlChange} />
      ) : null}

      {type === FormType.Internal ? (
        <IngredientForm onIngredientChange={handleIngredientChange} />
      ) : null}

      {type === FormType.Internal ? (
        <TextAreaInput
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className="description-textarea"
        />
      ) : null}
      <ImageUploader onImageSelected={setImage} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
