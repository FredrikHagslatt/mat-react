
require('dotenv').config()
const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const db = new Pool();

function GetDinnerMenu() {
    const sql = 'SELECT name, queue_pos, url, image FROM recipes WHERE queue_pos < 3 ORDER BY queue_pos DESC';
    return Promise.resolve(
        db.query(sql)
            .then((result) =>
                result)
    );
}

function GetMoreRecipes() {
    const sql = 'SELECT name, queue_pos, url, image FROM recipes ORDER BY name';
    return Promise.resolve(
        db.query(sql)
            .then((result) =>
                result)
    );
}

function GetRecipe(id) {
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

router.get('/api/dinnermenu', (req, res) => {
    const promise = GetDinnerMenu();
    promise.then((value) => {
        res.json({ 'data': JSON.stringify(value.rows) })
    });
})

router.get('/api/morerecipes', (req, res) => {
    const promise = GetMoreRecipes();
    promise.then((value) => {
        res.json({ 'data': JSON.stringify(value.rows) })
    });
})

router.post('/api/recipe', (req, res) => {
    const promise = GetRecipe(req.body.id);
    promise.then((value) => {
        res.json({ 'data': JSON.stringify(value.rows) })
    });
})

router.get('/api/hc', (req, res) => {
    res.json({
        status: 'Alive',
    })
})

module.exports = router;