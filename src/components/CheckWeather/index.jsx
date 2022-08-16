import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckWeather({weatherData, setWeatherData}) {
  const navigate = useNavigate();
  const [cityInput, setCityInput] = useState('');

  const handleCityChange = (e) => {
    setCityInput(e.target.value);
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.REACT_APP_API_URL}`;
    axios.get(API_URL)
      .then(res => {
        console.log(res.data);
        setWeatherData(res.data);
      }).catch(err => {
        console.log(err);
      }
      )
    console.log(weatherData);
    navigate('/dashboard');
  }

  return (
    <>
      <div className='weather-api-form' style={{zIndex: '100'}}>
        <h1>Check Weather</h1>
        <form>
            <label htmlFor="location-input">Tell Us Where you Are...</label>
            <input onChange={handleCityChange} type="text" name="location-input" id="location-input"/>
            <button onClick={handleSubmit} type="submit" id='submit-btn'>Submit</button>
        </form>
    </div>
    </>
  )
}
