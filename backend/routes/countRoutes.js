const express = require('express');
const Hotel = require('../models/Hotel');
const Food = require('../models/Food');

const router = express.Router();

// Hotel Count Route
router.get('/hotels/count', async (req, res) => {
  try {
    const count = await Hotel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hotel count' });
  }
});

// Food Count Route
router.get('/foods/count', async (req, res) => {
  try {
    const count = await Food.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching food count' });
  }
});

module.exports = router;
