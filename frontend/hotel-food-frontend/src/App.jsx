import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HotelList from './components/HotelList';
import FoodList from './components/FoodList';
import SearchPage from './components/SearchPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/hotels" element={<HotelList />} />
      <Route path="/foods" element={<FoodList />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  </Router>
);

export default App;
