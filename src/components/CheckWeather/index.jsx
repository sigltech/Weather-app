import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function CheckWeather({searchState, setSearchState}) {
  const [city, setCity] = useState();
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    setSearchState(false);
  },[])

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }
  const getCityCoordinates = async () => {
    try {
      const GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q={${city}}&limit=5&appid=f4f58893e8d26f71883611d84102ef37`;
          await axios.get(GEO_API_URL).then(res => {
            console.log(res.data)
            const cityLat = res.data[0].lat;
            const cityLon = res.data[0].lon;
            setCoordinates({'latitude':cityLat,'Longitude': cityLon});
            console.log(coordinates);
        })
      
    } catch (error) {
      console.log(error);
    }
      
    }

  function handleGetWeather(lat,long) {
    try {
      const weather_API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f4f58893e8d26f71883611d84102ef37`;
      const response = axios.get(weather_API_URL)
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
      
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getCityCoordinates();
    console.log('submitted')
    console.log(`city: ${city}`)
    console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.Longitude}`)
    console.log(`coordinates: ${JSON.stringify(coordinates)}`)
    handleGetWeather(coordinates.latitude,coordinates.Longitude);
    setSearchState(true);
    console.log('no coordinates')
  }

  return (
    <>
    {/* {!searchState ?  */}
      <div className='weather-api-form' style={{zIndex: '100'}}>
        <h1>Check Weather</h1>
        <form>
            <label htmlFor="location-input">Tell Us Where you Are...</label>
            <input onChange={handleCityChange} type="text" name="location-input" id="location-input"/>
            <button onClick={handleSubmit} type="submit" id='submit-btn'>Submit</button>
        </form>
    </div>
    {/* : <p>loading...</p>} */}
    </>
  )
}
