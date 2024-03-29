require("dotenv").config();

const logger = require("./logger");

const { Pool } = require("pg");
const db = new Pool();

async function query(sql, values) {
  try {
    const client = await db.connect();
    const result = await client.query(sql, values);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(`Error executing query: ${error}`);
  }
}

async function getDinnerMenu() {
  const sql =
    "SELECT name, queue_pos, url, type, image FROM recipes WHERE queue_pos < 3 ORDER BY queue_pos DESC";
  return query(sql);
}

async function getAllRecipes() {
  const sql =
    "SELECT name, queue_pos, url, type, image FROM recipes ORDER BY name";
  return query(sql);
}

async function getRecipeNames() {
  const sql = "SELECT name FROM recipes";
  return query(sql);
}

async function getRecipe(id) {
  const sql =
    " \
      SELECT \
        ingredients.name, \
        association_table.quantity, \
        association_table.unit \
      FROM association_table \
        INNER JOIN ingredients  ON      association_table.ingredient_id = ingredients.id \
      WHERE \
        recipe_id = $1 \
  ";

  return query(sql, [id]);
}

async function getRecipeByName(name) {
  const sql =
    " \
      SELECT r.*, array_agg(array[i.name, at.quantity::varchar, at.unit]) AS ingredients \
      FROM recipes r \
      LEFT JOIN association_table at ON r.id = at.recipe_id \
      LEFT JOIN ingredients i ON at.ingredient_id = i.id \
      WHERE r.name = $1 \
      GROUP BY r.id; \
    ";

  return query(sql, [name]);
}

async function addExternalRecipe(name, url, image) {
  const selectRecipeSql = "SELECT id FROM recipes WHERE name = $1";
  const insertRecipeSql =
    "INSERT INTO recipes (name, url, type, image) VALUES ($1, $2, $3, $4)";

  try {
    // Check if the recipe name already exists
    const existingRecipe = await query(selectRecipeSql, [name]);
    if (existingRecipe.length > 0) {
      throw new Error("Recipe name already exists");
    }

    await db.query(insertRecipeSql, [name, url, "External", image]);
    logger.info("External recipe added successfully!");
  } catch (error) {
    throw error;
  }
}

async function getAdminHash() {
  const sql = "SELECT password_hash FROM users WHERE username = 'admin'";
  return query(sql);
}

async function addInternalRecipe(name, description, ingredients, image) {
  const checkRecipeExistsSql = "SELECT id FROM recipes WHERE name = $1";
  const insertRecipeSql =
    "INSERT INTO recipes (name, description, type, image) VALUES ($1, $2, $3, $4) RETURNING id";
  const insertAssociationSql =
    "INSERT INTO association_table (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)";
  const findIngredientSql = "SELECT id FROM ingredients WHERE name = $1";

  try {
    await query("BEGIN");

    // Check if the recipe name already exists
    const existingRecipe = await query(checkRecipeExistsSql, [name]);
    if (existingRecipe.length > 0) {
      throw new Error("Recipe name already exists");
    }

    // Insert the recipe and retrieve the generated ID
    const { id } = (
      await query(insertRecipeSql, [name, description, "Internal", image])
    )[0];

    // Insert the ingredients associated with the recipe
    for (const ingredient of ingredients) {
      const { name, quantity, unit } = ingredient;

      // Check if the ingredient already exists in the ingredients table
      const existingIngredient = await query(findIngredientSql, [name]);

      if (existingIngredient.length === 0) {
        // If the ingredient doesn't exist, insert it into the ingredients table and get its ID
        const { id: ingredientId } = (
          await query(
            "INSERT INTO ingredients (name) VALUES ($1) RETURNING id",
            [name]
          )
        )[0];
        await query(insertAssociationSql, [id, ingredientId, quantity, unit]);
      } else {
        // If the ingredient already exists, use its ID to insert into the association_table
        await query(insertAssociationSql, [
          id,
          existingIngredient[0].id,
          quantity,
          unit,
        ]);
      }
    }

    await query("COMMIT");
    logger.info("Internal recipe added successfully!");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDinnerMenu,
  getAllRecipes,
  getRecipeNames,
  getRecipe,
  getRecipeByName,
  addExternalRecipe,
  addInternalRecipe,
  getAdminHash,
};
