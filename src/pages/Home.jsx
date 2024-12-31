import React from 'react';
import './Home.css';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import Navbar from '../components/Navbar/Navbar';
import { getWeather } from '../util.js';

const Home = () => {
  
  const getWeatherData = async () => {
    const weatherData = await getWeather('San Francisco', 'US');
    return weatherData;
  };

  // getWeatherData();

  return (
    <>
    <div className="header-container">
      <Navbar />
    </div>

    <div className="home-container">
      <div className="card-section">
        <WeatherCard className="weather-card"
          location="San Francisco"
          date="Sunday, Dec 29"
          icon="https://openweathermap.org/img/wn/02d@2x.png"
          temp={15}
          condition="Cloudy"
          humidity={72}
          wind={5}
        />
        {/* Placeholder for Insight Card */}
        <div className="insight-card">
          <h3>Insight Data</h3>
          <p>Placeholder for additional insight details.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
