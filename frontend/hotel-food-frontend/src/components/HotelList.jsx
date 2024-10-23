import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../api'; // Import the fetchHotels function
import style from '../styles/hotellist.module.css'; // Adjust the path as necessary

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading indication

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHotels();
        setHotels(response.data || []); // Set hotels data
      } catch (err) {
        setError('Error fetching hotel data'); // Set error message if there's an error
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.hotelListContainer}>
      <h1>Hotel List</h1>
      {loading && <p>Loading hotels...</p>} {/* Show loading message while fetching data */}
      {error && <p className={style.errorMessage}>{error}</p>} {/* Display error message if any */}
      <ul>
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <li key={hotel._id}>
              {hotel.name} - {hotel.location}
            </li>
          ))
        ) : (
          <li>No hotels found</li> // Message when no hotels are found
        )}
      </ul>
    </div>
  );
  
};

export default HotelList;
