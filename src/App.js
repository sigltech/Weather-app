import './App.css';
import React, { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import {LandingPage, WeatherDashboard} from './pages';
import Layout from './Layout';

function App() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  return (
    <Routes >
      <Route path="/" element={<Layout loading={loading} />}>
        <Route path="/" element={<LandingPage weatherData={weatherData} setWeatherData={setWeatherData} loading={loading} />} />
        <Route path="/dashboard" element={<WeatherDashboard loading={loading} weatherData={weatherData} />} />
      </Route>
    </Routes>
  );
}

export default App;
