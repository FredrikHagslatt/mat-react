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
  const insertRecipeSql = 'INSERT INTO recipes (name, url, type) VALUES ($1, $2, $3)';

  try {
    await db.query(insertRecipeSql, [name, url, 'External']);
    console.log('External recipe added successfully!');
  } catch (error) {
    console.error('Error adding external recipe:', error);
    throw new Error('Failed to add external recipe');
  }
}

async function addInternalRecipe(name, description, ingredients) {
  const insertRecipeSql = 'INSERT INTO recipes (name, description, type) VALUES ($1, $2, $3) RETURNING id';
  const insertAssociationSql = 'INSERT INTO association_table (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)';

  try {
    await query('BEGIN');
    console.log('Transaction started');
    // Insert the recipe and retrieve the generated ID
    const { id } = (await query(insertRecipeSql, [name, description, 'Internal']))[0];

    console.log('Recipe added with ID:', id);
    // Insert the ingredients associated with the recipe
    for (const ingredient of ingredients) {
      const { name, quantity, unit } = ingredient;
      await query(insertAssociationSql, [id, name, quantity, unit]);
    }

    await query('COMMIT');
    console.log('Internal recipe added successfully!');
  } catch (error) {
    console.error('Error adding internal recipe:', error);
    throw new Error('Failed to add internal recipe');
  }
}

module.exports = { getDinnerMenu, getMoreRecipes, getRecipe, addExternalRecipe, addInternalRecipe };