// models/food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    restaurant: { type: String, required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' } // Add this line if you're referencing a hotel
});

// Prevent Overwriting the Food Model
const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

module.exports = Food;
