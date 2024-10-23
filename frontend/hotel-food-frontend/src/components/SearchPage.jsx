import React, { useState } from 'react';
import { fetchHotels, fetchFoods } from '../api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading indication

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when search starts
    setError(null); // Reset any previous error
    try {
      const hotelResults = await fetchHotels(query);
      const foodResults = await fetchFoods(query);
      setHotels(hotelResults.data || []); // Set hotels data
      setFoods(foodResults.data || []); // Set foods data
    } catch (err) {
      setError('Error fetching search results'); // Set error message if there's an error
      console.error('Search error:', err);
    } finally {
      setLoading(false); // Set loading to false once search is complete
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search hotels or food..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading results...</p>} {/* Show loading message while fetching data */}
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}

      <h2>Hotels</h2>
      <ul>
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <li key={hotel._id}>{hotel.name}</li>
          ))
        ) : (
          <li>No hotels found</li> // Message when no hotels are found
        )}
      </ul>

      <h2>Foods</h2>
      <ul>
        {foods.length > 0 ? (
          foods.map(food => (
            <li key={food._id}>{food.name}</li>
          ))
        ) : (
          <li>No foods found</li> // Message when no foods are found
        )}
      </ul>
    </div>
  );
};

export default SearchPage;
