import React, { useState } from 'react'
import './style.css'
import heroImg from '../../assets/imgs/HeroImg.jpg'
import { CheckWeather } from '../../components'

export default function LandingPage({weatherData, setWeatherData}) {
  const [searchState, setSearchState] = useState(false);

  return (
    <div className='hero-mast'>
      <div className='left-box'>
          <img
            className='hero-img'
            src={heroImg}
            alt="wet weather road"
            />
      </div>
      <div className='right-box'>
        <CheckWeather weatherData={weatherData} setWeatherData={setWeatherData} searchState={searchState} setSearchState={setSearchState}/>
      </div>
    </div>
  )
}
