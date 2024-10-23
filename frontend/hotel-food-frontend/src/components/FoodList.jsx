import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import style from '../styles/foodlist.module.css'; // Adjust the path as necessary

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading indication

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/foods`); // Use environment variable for URL
        if (response.status === 200) {
          setFoods(response.data); // Assuming the response contains an array of food objects
        } else {
          setError('Failed to fetch food data'); // Handle non-200 status
        }
      } catch (err) {
        setError('Error fetching food data'); // Set error message if there's an error
        console.error('Error fetching foods:', err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className={style.foodListContainer}>
      <h1>Food List</h1>
      {error && <p className={style.errorMessage}>{error}</p>} {/* Display error message if any */}
      <ul>
        {foods.length > 0 ? (
          foods.map(food => (
            <li key={food._id}>
              {food.name} - {food.price} INR
            </li>
          ))
        ) : (
          <li>No foods available</li> // Message for empty food list
        )}
      </ul>
    </div>
  );
  
};

export default FoodList;
