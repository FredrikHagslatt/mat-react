const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const {
  getDinnerMenu,
  getMoreRecipes,
  getRecipe,
  addExternalRecipe,
  addInternalRecipe,
} = require("./database");

router.get("/api/dinnermenu", async (req, res) => {
  try {
    const dinnerMenu = await getDinnerMenu();
    res.json({ data: dinnerMenu });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/morerecipes", async (req, res) => {
  try {
    const recipes = await getMoreRecipes();
    res.json({ data: recipes });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/recipe", async (req, res) => {
  const { id } = req.body;
  try {
    const recipe = await getRecipe(id);
    res.json({ data: recipe });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/addrecipe/external", async (req, res) => {
  try {
    const { name, url } = req.body;

    // Call the addExternalRecipe function
    await addExternalRecipe(name, url);

    // Return a success response
    res.status(200).json({ message: "External recipe added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding internal recipe:", error);

    if (error.message === "Recipe name already exists") {
      res.status(500).json({ error: "Recipe name already exists" });
    } else {
      res.status(500).json({ error: "Failed to add internal recipe" });
    }
  }
});

router.post("/api/addrecipe/internal", async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;
    // Call the addInternalRecipe function
    await addInternalRecipe(name, description, ingredients);

    // Respond with a success message
    res.status(200).json({ message: "Internal recipe added successfully!" });
  } catch (error) {
    // Handle errors
    console.error("Error adding internal recipe:", error);

    if (error.message === "Recipe name already exists") {
      res.status(500).json({ error: "Recipe name already exists" });
    } else {
      res.status(500).json({ error: "Failed to add internal recipe" });
    }
  }
});

router.post("/api/login", (req, res) => {
  const { password } = req.body;
  const secretKey = "properly generated secret key";
  if (password === "1234") {
    // Generate a JWT token with user information and sign it using the secret key
    const token = jwt.sign({ username: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.get("/api/hc", (req, res) => {
  res.json({ status: "Alive" });
});

module.exports = router;
