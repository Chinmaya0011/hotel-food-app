// routes/food.js
const express = require('express');
const Food = require('../models/food'); // Ensure the model name matches

const router = express.Router();

// Get all foods with search and sort filters
router.get('/', async (req, res) => {
  const { search, sort } = req.query;
  try {
    let query = {};
    if (search) {
      query.name = new RegExp(search, 'i'); // Case-insensitive search
    }

    const foods = await Food.find(query)
      .populate('hotel') // Populate hotel details in food items if necessary
      .sort(sort ? { name: sort } : {});

    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error.message); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching foods', details: error.message });
  }
});

// Create a new food item
router.post('/', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    console.error('Error creating food:', error.message); // Log the error for debugging
    res.status(500).json({ error: 'Error creating food', details: error.message });
  }
});

module.exports = router;
