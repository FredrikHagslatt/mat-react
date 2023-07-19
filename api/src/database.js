require('dotenv').config()
const { Pool } = require('pg');
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
  const sql = 'SELECT name, queue_pos, url, image FROM recipes WHERE queue_pos < 3 ORDER BY queue_pos DESC';
  return query(sql);
}

async function getMoreRecipes() {
  const sql = 'SELECT name, queue_pos, url, image FROM recipes ORDER BY name';
  return query(sql);
}

function getRecipe(id) {
  const sql = ' \
      SELECT \
        ingredients.name, \
        association_table.quantity, \
        association_table.unit \
      FROM association_table \
        INNER JOIN ingredients  ON      association_table.ingredient_id = ingredients.id \
      WHERE \
        recipe_id = $1 \
  ';

  return query(sql, [id]);
}

async function addExternalRecipe(name, url) {
  const selectRecipeSql = 'SELECT id FROM recipes WHERE name = $1';
  const insertRecipeSql = 'INSERT INTO recipes (name, url, type) VALUES ($1, $2, $3)';

  try {
    // Check if the recipe name already exists
    const existingRecipe = await query(selectRecipeSql, [name]);
    if (existingRecipe.length > 0) {
      throw new Error('Recipe name already exists');
    }

    await db.query(insertRecipeSql, [name, url, 'External']);
    console.log('External recipe added successfully!');
  } catch (error) {
    throw error;
  }
}

async function addInternalRecipe(name, description, ingredients) {
  const checkRecipeExistsSql = 'SELECT id FROM recipes WHERE name = $1';
  const insertRecipeSql = 'INSERT INTO recipes (name, description, type) VALUES ($1, $2, $3) RETURNING id';
  const insertAssociationSql = 'INSERT INTO association_table (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)';
  const findIngredientSql = 'SELECT id FROM ingredients WHERE name = $1';

  try {
    await query('BEGIN');

    // Check if the recipe name already exists
    const existingRecipe = await query(checkRecipeExistsSql, [name]);
    console.log(existingRecipe.length);
    if (existingRecipe.length > 0) {
      throw new Error('Recipe name already exists');
    }

    // Insert the recipe and retrieve the generated ID
    const { id } = (await query(insertRecipeSql, [name, description, 'Internal']))[0];


    // Insert the ingredients associated with the recipe
    for (const ingredient of ingredients) {
      const { name, quantity, unit } = ingredient;

      // Check if the ingredient already exists in the ingredients table
      const existingIngredient = await query(findIngredientSql, [name]);

      if (existingIngredient.length === 0) {
        // If the ingredient doesn't exist, insert it into the ingredients table and get its ID
        const { id: ingredientId } = (await query('INSERT INTO ingredients (name) VALUES ($1) RETURNING id', [name]))[0];
        await query(insertAssociationSql, [id, ingredientId, quantity, unit]);
      } else {
        // If the ingredient already exists, use its ID to insert into the association_table
        await query(insertAssociationSql, [id, existingIngredient[0].id, quantity, unit]);
      }
    }

    await query('COMMIT');
    console.log('Internal recipe added successfully!');
  } catch (error) {
    throw error;
  }
}

module.exports = { getDinnerMenu, getMoreRecipes, getRecipe, addExternalRecipe, addInternalRecipe };