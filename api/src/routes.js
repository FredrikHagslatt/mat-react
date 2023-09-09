const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const saveImage = require("./image-saver");
const {
  getDinnerMenu,
  getAllRecipes,
  getRecipeNames,
  getRecipe,
  getRecipeByName,
  addExternalRecipe,
  addInternalRecipe,
  getAdminHash,
} = require("./database");

router.get("/api/dinner-menu", async (req, res) => {
  try {
    const dinnerMenu = await getDinnerMenu();
    res.json({ data: dinnerMenu });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/more-recipes", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json({ data: recipes });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/recipe-names", async (req, res) => {
  try {
    const recipes = await getRecipeNames();
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

router.post("/api/recipe-by-name", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const recipe = await getRecipeByName(name);
    res.json({ data: recipe });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
});

router.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const publicImageUrl = saveImage(req.file);

  // Respond with the public image URL
  res
    .status(200)
    .json({ message: "File uploaded successfully.", imageUrl: publicImageUrl });
});

router.post(
  "/api/add-recipe/external",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, url } = req.body;

      const image = saveImage(req.file);
      await addExternalRecipe(name, url, image);

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
  }
);

router.post(
  "/api/add-recipe/internal",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, ingredients } = req.body;
      const parsedIngredients = JSON.parse(ingredients);

      const image = saveImage(req.file);
      await addInternalRecipe(name, description, parsedIngredients, image);

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
  }
);

router.post("/api/login", async (req, res) => {
  try {
    const { password } = req.body;
    const [dbResult] = await getAdminHash();
    const adminHash = dbResult ? dbResult["password_hash"] : null;

    if (adminHash === null) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    bcrypt.compare(password, adminHash, (err, result) => {
      if (err) {
        throw err;
      }

      if (result) {
        const secretKey = "properly generated secret key";
        const token = jwt.sign({ username: "admin" }, secretKey, {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/hc", async (req, res) => {
  res.json({ status: "Alive" });
});

module.exports = router;
