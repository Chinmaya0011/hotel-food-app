import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchHotels = (search = '', sort = '') => 
  API.get(`/hotels?search=${search}&sort=${sort}`);

export const fetchFoods = (search = '', sort = '') => 
  API.get(`/foods?search=${search}&sort=${sort}`);
