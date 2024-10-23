import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../styles/dashboard.module.css'; // Import CSS module

const Dashboard = () => {
  const [hotelCount, setHotelCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hotelSearchQuery, setHotelSearchQuery] = useState('');
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [foods, setFoods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hotelResponse, foodResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/hotels/count'),
          axios.get('http://localhost:5000/api/foods/count'),
        ]);
        setHotelCount(hotelResponse.data.count);
        setFoodCount(foodResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setError('Failed to fetch counts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [hotelResponse, foodResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/hotels'),
          axios.get('http://localhost:5000/api/foods'),
        ]);
        setHotels(hotelResponse.data);
        setFoods(foodResponse.data);
      } catch (error) {
        console.error('Error fetching hotel and food data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(hotelSearchQuery.toLowerCase())
  );

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(foodSearchQuery.toLowerCase())
  );

  return (
    <div className={style.dashboardContainer}>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={style.errorText}>{error}</p>
      ) : (
        <>
          <p>Total Hotels: {hotelCount}</p>
          <p>Total Foods: {foodCount}</p>
  
          <div className={style.flexContainer}>
            {/* Hotel Section */}
            <div className={style.section}>
              <label htmlFor="hotelSearch" className={style.label}>Search Hotels:</label>
              <input
                id="hotelSearch"
                type="text"
                placeholder="Search hotels..."
                value={hotelSearchQuery}
                onChange={(e) => setHotelSearchQuery(e.target.value)}
                className={style.searchInput}
              />
              <h2>Filtered Hotels</h2>
              <ul className={style.hotelList}>
                {filteredHotels.length > 0 ? (
                  filteredHotels.map(hotel => (
                    <li key={hotel._id}>{hotel.name}</li>
                  ))
                ) : (
                  <li>No hotels found</li>
                )}
              </ul>
            </div>
  
            {/* Food Section */}
            <div className={style.section}>
              <label htmlFor="foodSearch" className={style.label}>Search Foods:</label>
              <input
                id="foodSearch"
                type="text"
                placeholder="Search foods..."
                value={foodSearchQuery}
                onChange={(e) => setFoodSearchQuery(e.target.value)}
                className={style.searchInput}
              />
              <h2>Filtered Foods</h2>
              <ul className={style.foodList}>
                {filteredFoods.length > 0 ? (
                  filteredFoods.map(food => (
                    <li key={food._id}>{food.name}</li>
                  ))
                ) : (
                  <li>No foods found</li>
                )}
              </ul>
            </div>
          </div>
  
          {/* Navigation Buttons */}
          <div className={style.buttonContainer}>
            <button onClick={() => navigate('/hotels')} className={style.button}>
              View Hotels
            </button>
            <button onClick={() => navigate('/foods')} className={style.button}>
              View Foods
            </button>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Dashboard;
