const express = require('express');
const Hotel = require('../models/hotel'); // Ensure the model name matches

const router = express.Router();

// Get all hotels with search and sort filters
router.get('/', async (req, res) => {
  const { search, sort } = req.query;
  try {
    let query = {};
    if (search) query.name = new RegExp(search, 'i'); // Case-insensitive search

    const hotels = await Hotel.find(query).sort(sort ? { name: sort } : {});
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hotels' });
  }
});

// Create a new hotel
router.post('/', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Error creating hotel' });
  }
});

module.exports = router;
