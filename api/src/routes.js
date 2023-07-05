
const express = require('express');
const router = express.Router();

const { getDinnerMenu, getMoreRecipes, getRecipe } = require('./database');

router.get('/api/dinnermenu', async (req, res) => {
    try {
        const dinnerMenu = await getDinnerMenu();
        res.json({ data: dinnerMenu });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/api/morerecipes', async (req, res) => {
    try {
        const recipes = await getMoreRecipes();
        res.json({ data: recipes });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/api/recipe', async (req, res) => {
    const { id } = req.body;
    try {
        const recipe = await getRecipe(id);
        res.json({ data: recipe });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/api/hc', (req, res) => {
    res.json({ status: 'Alive' })
})

module.exports = router;