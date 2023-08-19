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
    const data = await DBInterface.fetchData("/api/dinnermenu");
    return data.data;
  }

  static async GetMoreRecipes() {
    const data = await DBInterface.fetchData("/api/morerecipes");
    return data.data;
  }

  static async GetRecipe(id) {
    const data = await DBInterface.postData("/api/recipe", { id });
    return data.data;
  }

  static async addExternalRecipe(name, url) {
    try {
      await DBInterface.postData("/api/addrecipe/external", { name, url });
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

      const response = await fetch("/api/addrecipe/internal", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        if (data && data.error) {
          throw new Error(data.error);
        }
        throw new Error("Failed to add internal recipe");
      }

      console.log("Internal recipe added successfully!");
    } catch (error) {
      throw error; // Rethrow the error to handle it in the frontend
    }
  }
}

export default DBInterface;
