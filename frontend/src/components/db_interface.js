class DBInterface {
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      const data = await response.json();
      if (data && data.error) {
        throw new Error(data.error);
      }
      throw new Error("Failed to fetch data from the server");
    }
    return response.json();
  }

  static async postData(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      if (data && data.error) {
        throw new Error(data.error);
      }
      throw new Error("Failed to add recipe");
    }
    return response.json();
  }

  static async GetDinnerMenu() {
    const data = await DBInterface.fetchData("/api/dinner-menu");
    return data.data;
  }

  static async GetMoreRecipes() {
    const data = await DBInterface.fetchData("/api/more-recipes");
    return data.data;
  }

  static async GetRecipeNames() {
    const data = await DBInterface.fetchData("/api/recipe-names");
    const names = new Set(data.data.map((item) => item.name));
    return names;
  }

  static async GetRecipe(id) {
    const data = await DBInterface.postData("/api/recipe", { id });
    return data.data;
  }

  static async GetRecipeByName(name) {
    const data = await DBInterface.postData("/api/recipe-by-name", { name });
    return data.data[0];
  }

  static async addExternalRecipe(name, url, imageFile) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("url", url);
      formData.append("image", imageFile);

      await fetch("/api/add-recipe/external", {
        method: "POST",
        body: formData,
      });

      console.log("External recipe added successfully!");
    } catch (error) {
      throw error; // Rethrow the error to handle it in the frontend
    }
  }

  static async addInternalRecipe(name, description, ingredients, imageFile) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("image", imageFile);

      await fetch("/api/add-recipe/internal", {
        method: "POST",
        body: formData,
      });

      console.log("Internal recipe added successfully!");
    } catch (error) {
      throw error; // Rethrow the error to handle it in the frontend
    }
  }
}

export default DBInterface;
