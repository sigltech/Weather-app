import React from 'react'
import { Loading } from '../../components';
import './style.css'
import { useNavigate } from 'react-router-dom';
import sunriseImg from '../../assets/imgs/sunrise-img.png';
import sunsetImg from '../../assets/imgs/sunset-img.png';
import axios from 'axios';
import { useEffect } from 'react';

export default function WeatherDashboard({weatherData}) {
    const navigate = useNavigate();
    console.log(weatherData);

    const gmapsLink = () => {
        const google_maps_api_URL = `https://www.google.com/maps/search/?api=1&query=${weatherData.coord.lat},${weatherData.coord.lon}`;
        const response = axios.get(google_maps_api_URL)
        console.log(response.data);
    }


    const unixTimeConverter = (unixTime) => {
        const date = new Date(unixTime * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    const weatherIcon = (id) => {
        return `http://openweathermap.org/img/wn/${id}@2x.png`
    }

    if(weatherData === null) {
        return (
            <div className='no-city-sel-error'>
                <div>
                <h1>It looks like you do not have a city selected.</h1>
                <h2>Please select a city to see the weather.</h2>
                <button className='back-btn-403' onClick={() => navigate('/')}>Take me there!</button>
                </div>
            </div>
        )
    } else {

        return (
        <div className='dashboard-container'>
            <h1 className='dashboard-header'>{weatherData.name}</h1>
            <div className='dashboard-contents'>
                <div className='dashboard-left'>
                    <div className='weather-info'>
                        <div className='weather-info-box'>
                            <h2>Weather</h2>
                            <img src={weatherIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
                            <p>{weatherData.weather[0].description}</p>
                        </div>
                    </div>
                    <div className='weather-info'>
                        <div className='weather-info-box'>
                            <h3>Temperature</h3>
                            <p className='dashboard-values'>{weatherData.main.temp}</p>
                        </div>
                        <div className='weather-info-box'>
                            <h3>Feels Like</h3>
                            <p className='dashboard-values'>{weatherData.main.feels_like}</p>
                        </div>
                    </div>
                    <div className='weather-info'>
                        <div className='weather-info-box'>
                            <h3>Wind Speed</h3>
                            <p className='dashboard-values'>{weatherData.wind.speed}</p>
                        </div>
                        <div className='weather-info-box'>
                            <h3>Wind Temperature</h3>
                            <p className='dashboard-values'>{weatherData.wind.deg}</p>
                        </div>
                    </div>
                    <div className='weather-info'>
                        <div className='weather-info-box'>
                            <img 
                                src={sunriseImg}
                                alt="sunrise - rising sun" 
                                width={'100px'}
                                />
                            <p>{unixTimeConverter(weatherData.sys.sunrise)}</p>
                        </div>
                        <div className='weather-info-box'>
                            <img 
                                src={sunsetImg}
                                alt="sunrise - rising sun" 
                                width={'100px'}
                            />
                            <p>{unixTimeConverter(weatherData.sys.sunset)}</p>
                        </div>
                    </div>
                </div>
            {/* <div className='dashboard-right'>
                <div className='weather-info'>
                    <div className='weather-info-box'>
                        <h3>Humidity</h3>
                        <p className='dashboard-values'>{weatherData.main.humidity}</p>
                    </div>
                </div>
                <div className='weather-info'>
                    <div className='weather-info-box'>
                        <h3>Pressure</h3>
                        <p className='dashboard-values'>{weatherData.main.pressure}</p>
                    </div>
                </div>
                <div className='weather-info'>
                    <div className='weather-info-box'>
                        <h3>Cloudiness</h3>
                        {gmapsLink}
                    </div>
                </div>
            </div> */}

            </div>
        </div>
        )
    }
}
