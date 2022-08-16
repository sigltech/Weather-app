import React from 'react'
import './style.css'
import heroImg from '../../assets/imgs/HeroImg.jpg'
import { CheckWeather } from '../../components'

export default function LandingPage() {
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
        <h1>Check Weather</h1>
        <CheckWeather />
      </div>
    </div>
  )
}
