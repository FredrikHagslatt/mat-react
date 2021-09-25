require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
// Database

const { Pool } = require('pg');
const db = new Pool();

function GetDinnerMenu(){
  const sql = 'SELECT name, queue_pos, url, image FROM recipes WHERE queue_pos < 3 ORDER BY queue_pos';
  return Promise.resolve(
    db.query(sql)
    .then((result) =>
    result) 
  );
}

function GetMoreRecipes(){
  const sql = 'SELECT name, queue_pos, url, image FROM recipes ORDER BY name';
  return Promise.resolve(
    db.query(sql)
    .then((result) =>
    result) 
  );
}


function GetRecipe(id){
  const sql = ' \
    SELECT \
      ingredients.name, \
      association_table.quantity, \
      association_table.unit \
    FROM association_table \
      INNER JOIN ingredients  ON      association_table.ingredient_id = ingredients.id \
    WHERE \
      recipe_id = ' + (id).toString() + ' \
  ;'

  return Promise.resolve(
    db.query(sql)
    .then((result) =>
    result) 
  );
}


// App
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/api/hc', (req, res) => {
  res.json({
    status: 'Alive',
  })
})


app.get('/api/dinnermenu', (req, res) => {
  const promise = GetDinnerMenu(); 
  promise.then((value) => {
    res.json({'data': JSON.stringify(value.rows)})
  });
})


app.get('/api/morerecipes', (req, res) => {
  const promise = GetMoreRecipes(); 
  promise.then((value) => {
    res.json({'data': JSON.stringify(value.rows)})
  });
})


app.post('/api/recipe', (req, res) => {
  const promise = GetRecipe(req.body.id);
  promise.then((value) => {
    res.json({'data': JSON.stringify(value.rows)})
  });
})


const PORT = 3001;
app.listen(PORT, () => console.log('Server is up!!'));
console.log('Running on http://localhost:' + PORT );