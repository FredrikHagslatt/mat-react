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

module.exports = { getDinnerMenu, getMoreRecipes, getRecipe };