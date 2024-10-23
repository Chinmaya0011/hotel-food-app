const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Hotel = require('./models/hotel'); // Adjust the path as needed
const Food = require('./models/Food'); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect('mongodb+srv://imchinu17:chinmaya17@cluster0.lbwq2.mongodb.net/hotel-food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    // Load hotel data
    const hotelData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'hotels.json'), 'utf-8'));
    Hotel.insertMany(hotelData)
        .then(() => console.log('Hotels inserted'))
        .catch(err => console.error('Error inserting hotels:', err));

    // Load food data
    const foodData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'foods.json'), 'utf-8'));
    Food.insertMany(foodData)
        .then(() => console.log('Foods inserted'))
        .catch(err => console.error('Error inserting foods:', err));

}).catch(err => console.error('Error connecting to MongoDB:', err));
